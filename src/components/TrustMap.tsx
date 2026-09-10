import { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'

export interface TrustNode {
  id: string
  type: 'bitcoin' | 'nostr' | 'agent'
  score: number
  label?: string
}

export interface TrustLink {
  source: string
  target: string
  strength: number
}

interface Props {
  nodes: TrustNode[]
  links: TrustLink[]
  height?: number
}

function TrustMap({ nodes, links, height = 500 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hovered, setHovered] = useState<TrustNode | null>(null)

  useEffect(() => {
    const svgElement = svgRef.current
    if (!svgElement || nodes.length === 0) return

    const width = svgElement.clientWidth || 800

    const svg = d3.select(svgElement)
    svg.selectAll('*').remove()

    const defs = svg.append('defs')
    defs
      .append('filter')
      .attr('id', 'glow')
      .append('feGaussianBlur')
      .attr('stdDeviation', 3)
      .attr('result', 'coloredBlur')

    const nodesCopy = nodes.map((n) => ({ ...n }))
    const linksCopy = links.map((l) => ({ ...l }))

    const simulation = d3
      .forceSimulation(nodesCopy as d3.SimulationNodeDatum[])
      .force(
        'link',
        d3
          .forceLink(linksCopy)
          .id((d: any) => d.id)
          .distance((d: any) => 100 + (1 - d.strength) * 80)
          .strength(0.5)
      )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(50))

    const link = svg
      .append('g')
      .selectAll('line')
      .data(linksCopy)
      .join('line')
      .attr('stroke', '#2a2a38')
      .attr('stroke-width', (d: any) => 1 + d.strength * 3)
      .attr('stroke-opacity', 0.6)

    const colorFor = (node: TrustNode) => {
      if (node.type === 'bitcoin') {
        if (node.score >= 80) return '#f7931a'
        if (node.score >= 60) return '#ffab3d'
        if (node.score >= 40) return '#eab308'
        return '#ef4444'
      }
      if (node.type === 'nostr') {
        if (node.score >= 80) return '#8b5cf6'
        if (node.score >= 60) return '#a78bfa'
        return '#c4b5fd'
      }
      if (node.score >= 80) return '#22c55e'
      if (node.score >= 60) return '#4ade80'
      return '#86efac'
    }

    const nodeGroup = svg
      .append('g')
      .selectAll('g')
      .data(nodesCopy)
      .join('g')
      .style('cursor', 'pointer')

    nodeGroup
      .append('circle')
      .attr('r', (d: any) => 14 + d.score / 8)
      .attr('fill', (d: any) => colorFor(d))
      .attr('stroke', '#0a0a0f')
      .attr('stroke-width', 2)
      .attr('filter', 'url(#glow)')
      .attr('opacity', 0.9)

    nodeGroup
      .append('text')
      .text((d: any) => {
        if (d.type === 'bitcoin') return '₿'
        if (d.type === 'nostr') return 'N'
        return 'AI'
      })
      .attr('font-size', (d: any) => (d.type === 'agent' ? 9 : 12))
      .attr('font-weight', 'bold')
      .attr('fill', '#0a0a0f')
      .attr('text-anchor', 'middle')
      .attr('dy', 4)

    nodeGroup
      .append('text')
      .text((d: any) => d.label || d.id.slice(0, 8))
      .attr('font-size', 10)
      .attr('fill', '#a0a0b0')
      .attr('text-anchor', 'middle')
      .attr('dy', (d: any) => 30 + d.score / 8)

    nodeGroup
      .on('mouseenter', function (_event: any, d: any) {
        setHovered(d)
        d3.select(this)
          .select('circle')
          .transition()
          .duration(150)
          .attr('r', (dd: any) => 20 + dd.score / 8)
      })
      .on('mouseleave', function (_, d: any) {
        setHovered(null)
        d3.select(this)
          .select('circle')
          .transition()
          .duration(150)
          .attr('r', (dd: any) => 14 + dd.score / 8)
      })

    const dragBehavior = d3
      .drag<SVGGElement, any>()
      .on('start', function (event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      })
      .on('drag', function (event: any, d: any) {
        d.fx = event.x
        d.fy = event.y
      })
      .on('end', function (event: any, d: any) {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      })

    nodeGroup.call(dragBehavior as any)

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y)

      nodeGroup.attr('transform', (d: any) => `translate(${d.x},${d.y})`)
    })

    return () => {
      simulation.stop()
    }
  }, [nodes, links, height])

  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.05rem' }}>Live Trust Graph</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Drag nodes to explore connections
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem' }}>
          <span style={{ color: '#f7931a' }}>● Bitcoin</span>
          <span style={{ color: '#8b5cf6' }}>● Nostr</span>
          <span style={{ color: '#22c55e' }}>● AI Agent</span>
        </div>
      </div>

      <svg
        ref={svgRef}
        style={{
          width: '100%',
          height: `${height}px`,
          background:
            'radial-gradient(circle at center, rgba(247,147,26,0.05) 0%, transparent 70%)',
        }}
      />

      {hovered && (
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            fontSize: '0.8rem',
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
            {hovered.label || hovered.id.slice(0, 12)}
          </div>
          <div style={{ color: 'var(--text-muted)' }}>
            {hovered.type} · score {hovered.score}
          </div>
        </div>
      )}
    </div>
  )
}

export default TrustMap
