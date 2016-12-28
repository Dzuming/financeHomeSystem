import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { ProductService } from '../product/product.service';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  private data: Array<any>;
  private svg: any;
  private errorMessage: Array<any>;
  private readonly color = d3.scaleOrdinal(d3.schemeCategory20b);
  public constructor(private productService: ProductService) {

  }

  ngOnInit() {
    this.getData();
  }

  ngOnChanges() {
  }

  dataChart(setData) {
    return setData.filter((data) => data.spending < 0)
      .map((dataset) => { return { "spending": - dataset.spending, "category": dataset.categories.name } })
  }

  dataChartSum(dataChart): any {
    return d3.nest().key((d: any) => d.category)
      .rollup((value): any => d3.sum(value, (d: any) => d.spending))
      .entries(dataChart);
  }

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
      (this.dataChartSum(this.dataChart(this.data)));
    let g = this.svg.selectAll('arc')
      .data(pie)
      .enter()
      .append('g')
      .attr('class', 'arc')
    g.append("path")
      .attr("d", arc)
      .style('fill', (d: any) => this.color(d.data.key))
      .style('stroke', (d: any) => this.color(d.data.key))
    g.append("text")
      .attr("transform", (d) => "translate(" + arc.centroid(d) + ")")
      .attr("text-anchor", "middle")
      .text((d: any) => d.data.value.toFixed(2))
      .style("fill", "#fff");
    this.addLegend()
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
  private getData() {
    this.productService.getProducts()
      .subscribe(
      data => { this.data = data },
      error => this.errorMessage = <any>error,
      () => this.createChart())
  }
  //TODO: Update onChange
  //TODO: Share getProducts
  //TODO update onFilter
}