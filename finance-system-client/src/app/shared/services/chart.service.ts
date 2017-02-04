import { Injectable } from '@angular/core';
import * as d3 from 'd3';
@Injectable()
export class ChartService {

  public filterProducts: Array<any>;
  private svg: any;
  private g: any;
  private readonly color = d3.scaleOrdinal(d3.schemeCategory20b);
  constructor() { }

  createChart(data) {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    this.svg = d3.select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
    let arc: any = d3.arc()
      .innerRadius(radius - 70)
      .outerRadius(radius);
    let pie = d3.pie()
      .sort(null)
      .value((d: any) => d.value)
      (this.SumofSingleCategories(this.rawDataChart(data)));
    this.g = this.svg.selectAll('arc')
      .data(pie)
      .enter()
      .append('g')
      .attr('class', 'arc');
    this.g.append('path')
      .attr('d', arc)
      .style('fill', (d: any) => this.color(d.data.key))
      .style('stroke', (d: any) => this.color(d.data.key));
    this.g.append('text')
      .attr('transform', (d) => 'translate(' + arc.centroid(d) + ')')
      .attr('text-anchor', 'middle')
      .text((d: any) => d.data.value.toFixed(2))
      .style('fill', '#fff');
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
  addtooltip(SumofAllCategories) {
    this.g.on('mouseover', function (d) {
      let point = d3.mouse(this),
        p = { x: point[0], y: point[1] };
      d3.select('#chart')
        .append('tooltip')
        .attr('class', 'tooltip')
        .style('left', p.x + 20 + 'px')
        .style('top', p.y + 200 + 'px')
        .style('opacity', 1)
        .text(d.data.key + ': ' + ((d.data.value / SumofAllCategories) * 100).toFixed(2) + '%');
    });
    this.g.on('mouseout', function (d) {
      d3.selectAll('tooltip')
        .remove();
    });
  };
  addLegend() {
    let legendRectSize = 18;
    let legendSpacing = 4;
    let legend = this.svg.selectAll('.legend')
      .data(this.color.domain())
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => {
        let height = legendRectSize + legendSpacing;
        let offset = height * this.color.domain().length / 2;
        let horz = -2 * legendRectSize;
        let vert = i * height - offset;
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
    d3.select('svg')
      .remove()
      .exit();
    this.createChart(data);
  };
}
