'use client';

import * as d3 from 'd3';
import cloud from 'd3-cloud';
import { useEffect, useRef } from 'react';

interface Word {
  text: string;
  size: number;
}

const customColors = [
  "#ffa43a", "#759eff", "#75c7ff", "#f86f6f", "#00c6ab",
  "#3f8880", "#9b207a", "#ee3d42", "#c34457", "#6f33d3"
];

const D3Cloud = ({ words }: { words: Word[] }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svgElement = svgRef.current;
    if (!svgElement) return; // Verifique se svgRef.current não é nulo

    const svg = d3.select(svgElement);
    const width = 500;
    const height = 300;

    // Limpa renderizações anteriores
    svg.selectAll('*').remove();

    const layout = cloud()
      .size([width, height])
      .words(
        words.map((word) => ({
          text: word.text,
          size: word.size,
        }))
      )
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 90 : 0))
      .fontSize((d: any) => (d.size ? d.size : 10))
      .on('end', (renderedWords) => {
        // Verifique se a referência do SVG está disponível novamente antes de tentar manipulá-lo
        if (!svgRef.current) return;

        svg
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`)
          .selectAll('text')
          .data(renderedWords)
          .enter()
          .append('text')
          .style('font-size', (d: any) => `${d.size}px`)
          .style('fill', (d: any, i: number) => customColors[i % 10])
          .attr('text-anchor', 'middle')
          .attr('transform', (d: any) => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
          .text((d: any) => d.text);
      });

    layout.start();
  }, [words]); // Dependência do "words" para atualizar sempre que o valor de "words" mudar

  return <svg ref={svgRef}></svg>;
};

export default D3Cloud;