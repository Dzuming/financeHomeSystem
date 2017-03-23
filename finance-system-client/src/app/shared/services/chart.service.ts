import { Injectable } from '@angular/core';
import * as d3 from 'd3';
@Injectable()
export class ChartService {

  public filterProducts: Array<any>;
  private svg: any;
  private g: any;
  private pie;
  private arc: any;
  private initAngle;
  private path: any;
  private readonly color = d3.scaleOrdinal(d3.schemeCategory20b);
  private readonly width = 300;
  private readonly height = 300;
  constructor() { }

  createChart(data) {
    if (data.length === 0) {
      return;
    }
    this.calculateArc(this.width, this.height);
    this.svg = d3.select('#chart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', 'translate(' + (this.width / 2) + ',' + (this.height / 2) + ')');
    this.pieValue(data);
    this.g = this.svg.selectAll('arc')
      .data(this.pie)
      .enter()
      .append('g')
      .attr('class', 'arc')
      .each(d => { this.initAngle = d; });
    this.g.append('path');
    this.path = d3.selectAll('path')
      .attr('d', this.arc)
      .style('fill', (d: any) => this.color(d.data.key))
      .style('stroke', (d: any) => this.color(d.data.key));

    this.addText();
    this.addLegend();
    this.addtooltip(this.SumofAllCategories(this.rawDataChart(data)));
  }
  rawDataChart(setData) {
    return setData.filter((data) => data.Spending < 0)
      .map((dataset) => { return { 'Spending': - dataset.Spending, 'Category': dataset.Category.name }; });
  }

  SumofSingleCategories(dataChart): any {
    return d3.nest().key((d: any) => d.Category)
      .rollup((value): any => d3.sum(value, (d: any) => d.Spending))
      .entries(dataChart);
  }
  SumofAllCategories(dataChart): any {
    return d3.nest()
      .rollup((value): any => d3.sum(value, (d: any) => d.Spending))
      .object(dataChart);
  }
  pieValue(data) {
    this.pie = d3.pie()
      .sort(null)
      .value((d: any) => d.value)
      (this.SumofSingleCategories(this.rawDataChart(data)));
  }
  calculateArc(width, height) {
    const radius = Math.min(width, height) / 2;
    this.arc = d3.arc()
      .innerRadius(radius - 70)
      .outerRadius(radius);

  }
  addText() {
    this.g.data(this.pie);
    this.g.append('text')
      .attr('transform', (d) => 'translate(' + this.arc.centroid(d) + ')')
      .attr('text-anchor', 'middle')
      .text((d: any) => d.data.value.toFixed(2))
      .style('fill', '#fff');
  }
  addtooltip(SumofAllCategories) {
    this.g.on('mouseenter', function (d) {
      const point = d3.mouse(this),
        p = { x: point[0], y: point[1] };
      d3.select('#chart')
        .append('tooltip')
        .attr('class', 'tooltip')
        .style('left', p.x + 20 + 'px')
        .style('top', p.y + 200 + 'px')
        .style('opacity', 1)
        .text(d.data.key + ': ' + ((d.data.value / SumofAllCategories) * 100).toFixed(2) + '%');
    });
    this.g.on('mouseleave', function (d) {
      d3.selectAll('tooltip')
        .remove();
    });
  };
  addLegend() {
    const legendRectSize = 18;
    const legendSpacing = 4;
    const legend = this.svg.selectAll('.legend')
      .data(this.color.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => {
        const height = legendRectSize + legendSpacing;
        const offset = height * this.color.domain().length / 2;
        const horz = -2 * legendRectSize;
        const vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });
    legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', this.color)
      .style('stroke', this.color);
    legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text((d) => d);
  }
  updateChart(data) {
    if (!this.svg && data.length !== 0 || document.getElementsByTagName('svg').length === 0 && data.length !== 0) {
      this.createChart(data);
    } else if (data.length === 0) {
      d3.select('svg').remove();
      return;
    }
    this.pieValue(data);
    this.g.selectAll('text').remove();
    this.path = this.path.data(this.pie);
    this.path.transition().duration(750).attrTween('d', this.arcTween.bind(null, this.arc, this.initAngle));
    this.addText();
    this.addLegend();
    this.addtooltip(this.SumofAllCategories(this.rawDataChart(data)));
  };
  arcTween(arc, initAngle, a) {
    const tempArc = arc;
    const i = d3.interpolate(initAngle, a);
    initAngle = i(0);
    return function (t) {
      return tempArc(i(t));
    };
  }
}
