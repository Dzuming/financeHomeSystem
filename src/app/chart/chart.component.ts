//TODO: Update chart
//TODO: Update onChange - change detection
//TODO Function to getData
import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { CalculateService } from '../shared/services/calculate.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  private data: Array<any>;
  private svg: any;
  private g: any;
  private errorMessage: Array<any>;
  private readonly color = d3.scaleOrdinal(d3.schemeCategory20b);
  public constructor(private calculateService: CalculateService) { }
  ngOnInit() {
    // this.getData();

    // setInterval(() => {
    //   this.getData();
    // }, 5000)

  }

  ngOnChanges() {

  }
  // private getData() {
  //   this.calculateService.filterProductObserver.subscribe(
  //     data => this.data = data,
  //     error => this.errorMessage = <any>error,
  //     () => {
  //       if (!this.svg) {
  //         this.createChart()
  //       } else {
  //         this.updateChart()
  //       }

  //     })
  // }
  // private test() {
  //   this.calculateService.filterDateObserver.subscribe(
  //     data => console.log(data),
  //     error => this.errorMessage = <any>error,
  //     () => {
  //     })
  // }
  createChart() {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    this.svg = d3.select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
    let arc: any = d3.arc()
      .innerRadius(radius - 70)
      .outerRadius(radius);
    let pie = d3.pie()
      .sort(null)
      .value((d: any) => d.value)
      (this.SumofSingleCategories(this.rawDataChart(this.data)));
    this.g = this.svg.selectAll('arc')
      .data(pie)
      .enter()
      .append('g')
      .attr('class', 'arc')
    this.g.append("path")
      .attr("d", arc)
      .style('fill', (d: any) => this.color(d.data.key))
      .style('stroke', (d: any) => this.color(d.data.key))
    this.g.append("text")
      .attr("transform", (d) => "translate(" + arc.centroid(d) + ")")
      .attr("text-anchor", "middle")
      .text((d: any) => d.data.value.toFixed(2))
      .style("fill", "#fff");
    this.addLegend();
    this.addtooltip(this.SumofAllCategories(this.rawDataChart(this.data)));
  }
  updateChart() {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
    let arc: any = d3.arc()
      .innerRadius(radius - 70)
      .outerRadius(radius);
    let pie = d3.pie()
      .sort(null)
      .value((d: any) => d.value)
      (this.SumofSingleCategories(this.rawDataChart(this.data)));
    // if (pie === undefined || pie.length === 0) {
    //   this.svg = d3.select('#chart')
    //   .remove()
    // 		.exit()
    // }

    this.g = this.svg.selectAll('arc')
      .data(pie)
      .selectAll('path')
      .attr("d", arc)

    // this.g = this.svg.selectAll('arc')
    //   .data(pie)
    //   .enter()
    //   .append('g')

    // this.svg.selectAll("text")
    //   .attr("transform", (d) => "translate(" + arc.centroid(d) + ")")
    //   .attr("text-anchor", "middle")
    //   .text((d: any) => d.data.value.toFixed(2))
    //   .style("fill", "#fff");
    // this.addLegend();
    // this.addtooltip(this.SumofAllCategories(this.rawDataChart(this.data)));

  }
  rawDataChart(setData) {
    return setData.filter((data) => data.spending < 0)
      .map((dataset) => { return { "spending": - dataset.spending, "category": dataset.categories.name } })
  }

  SumofSingleCategories(dataChart): any {
    return d3.nest().key((d: any) => d.category)
      .rollup((value): any => d3.sum(value, (d: any) => d.spending))
      .entries(dataChart);
  }
  SumofAllCategories(dataChart): any {
    return d3.nest()
      .rollup((value): any => d3.sum(value, (d: any) => d.spending))
      .object(dataChart);
  }
  addtooltip(SumofAllCategories) {
    this.g.on('mouseover', function (d) {
      let point = d3.mouse(this),
        p = { x: point[0], y: point[1] };
      d3.select("#chart")
        .append("tooltip")
        .attr("class", "tooltip")
        .style("left", p.x + 20 + "px")
        .style("top", p.y + 200 + "px")
        .style("opacity", 1)
        .style("fill", "red")
        .text(d.data.key + ":" + Math.floor((d.data.value / SumofAllCategories) * 100) + "%");
    });
    this.g.on('mouseout', function (d) {
      d3.selectAll("tooltip")
        .style("display", "none")
    });
  }
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

}