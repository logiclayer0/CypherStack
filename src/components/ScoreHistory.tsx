import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface Props {
  data: { time: string; score: number }[]
}

function ScoreHistory({ data }: Props) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || data.length === 0) return

    const width = el.clientWidth || 600
    const height = 200
    const padding = 30

    const svg = d3.select(el)
    svg.selectAll('*').remove()

    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.time))
      .range([padding, width - padding])

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - padding, padding])

    const line = d3
      .line<{ time: string; score: number }>()
      .x((d) => x(d.time) || 0)
      .y((d) => y(d.score))
      .curve(d3.curveMonotoneX)

    const area = d3
      .area<{ time: string; score: number }>()
      .x((d) => x(d.time) || 0)
      .y0(height - padding)
      .y1((d) => y(d.score))
      .curve(d3.curveMonotoneX)

    const gradient = svg
      .append('defs')
      .append('linearGradient')
      .attr('id', 'areaGrad')
      .attr('x1', '0')
      .attr('y1', '0')
      .attr('x2', '0')
      .attr('y2', '1')

    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#f7931a').attr('stop-opacity', 0.3)
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#f7931a').attr('stop-opacity', 0)

    svg.append('path').datum(data).attr('fill', 'url(#areaGrad)').attr('d', area as any)
    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#f7931a')
      .attr('stroke-width', 2)
      .attr('d', line as any)

    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => x(d.time) || 0)
      .attr('cy', (d) => y(d.score))
      .attr('r', 4)
      .attr('fill', '#0a0a0f')
      .attr('stroke', '#f7931a')
      .attr('stroke-width', 2)
  }, [data])

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '1.5rem',
      }}
    >
      <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Score History</h3>
      <svg ref={ref} style={{ width: '100%', height: '200px' }} />
    </div>
  )
}

export default ScoreHistory