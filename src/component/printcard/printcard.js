import React from 'react';
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile';


class PrintCard extends React.Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }

    render() {
        return (
            <div>
                <WingBlank>
                    <WhiteSpace></WhiteSpace>
                    {this.props.userlist.map(v => (
                        v.avatar ? ( 
                            <div key={v._id}>
                                <Card key={v._id}>
                                    <Card.Header
                                        title={v.user}
                                        thumb={require(`../imgs/${v.avatar}.png`)}
                                        extra={<span>{v.title}</span>}></Card.Header>
                                    <Card.Body>
                                        {v.type==='boss' ? <div>公司:{v.company}</div> : null}
                                        {v.decs.split('/n').map(d => (
                                            <div key={d}>{d}</div> 
                                        ))}
                                        {v.type==='boss' ? <div>薪资:{v.money}</div> : null}
                                    </Card.Body>
                                </Card>
                                <WhiteSpace></WhiteSpace>
                            </div>
                        ) : null
                    ))}
                </WingBlank>
            </div>

        )
    }
}

export default PrintCard