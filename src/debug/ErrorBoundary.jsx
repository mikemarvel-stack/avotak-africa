import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    if (this.props.onError) this.props.onError(error, info)
    // Also log to console for easier debugging
    console.error('ErrorBoundary caught error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback || (
          <div style={{ color: 'crimson', padding: 12 }}>
            <strong>Render error:</strong> {String(this.state.error.message || this.state.error)}
          </div>
        )
      )
    }
    return this.props.children
  }
}
