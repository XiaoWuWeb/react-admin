import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { AppState } from '../../store/app-state'

@inject('appState') @observer

export default class TopicList extends React.Component {
  constructor() {
    super()
    this.changName = this.changName.bind(this)
  }

  componentDidMount() {
    // do something here
  }

  // 在这里操作异步的数据，内容"数据的初始化""
  /* eslint-disable */
  asyncBootstrap() {
    return new Promise((reslove) => {
      setTimeout(() => {
        this.props.appState.count = 3
        reslove(true)
      })
    })
  }
    /* eslint-ensable */
  changName(event) {
    // this.props.appState.changName(event.target.value)
    this.props.appState.name = event.target.value  // eslint-disable-line
  }

  render() {
    let msg = this.props.appState.msg // eslint-disable-line
    return (
      <div>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is description" />
          <style type="text/css">{`
            *{
              margin:0;
              padding:0;
            }
            body {
              background-color: #fff;
            }
            p {
              font-size: 16px;
            }
          `}</style>
        </Helmet>
        <input type="text" onChange={this.changName} />
        <span>{msg}</span>
      </div>
    )
  }
}

TopicList.prototypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
}
