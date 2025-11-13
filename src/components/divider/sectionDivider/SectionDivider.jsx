export default function SectionDivider({
    text = '',               // optional center label
    dashed = false,          // dashed or solid line
    color = 'var(--border)', // line color (matches your theme)
    thickness = 1,           // line thickness in px
    margin = '12px 0'        // vertical spacing around the divider
  }) {
    const lineStyle = {
      borderTop: `${thickness}px ${dashed ? 'dashed' : 'solid'} ${color}`,
      height: 0,
      flex: 1
    }
    return (
      <div role="separator" aria-orientation="horizontal"
           style={{ display:'flex', alignItems:'center', gap:12, margin }}>
        <div style={lineStyle} />
        {text ? (
          <div style={{display:'flex',alignItems:'center',gap:8, margin:'8px 0'}}>
          <span className="pill">{text}</span>
        </div>
        ) : null}
        <div style={lineStyle} />
      </div>
    )
  }