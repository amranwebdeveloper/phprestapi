import React, { Component } from 'react';
class FooterTwo extends Component {
    render() {
        var { fClass } = this.props;
        let FooterData = this.props.FooterData;
        return (
            <footer className={`footer_area footer_area_four f_bg ${fClass}`}>
                <div className="footer_bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-5 col-sm-6">
                                <p className="mb-0 f_400">{FooterData.copywrite}</p>
                            </div>
                            <div className="col-lg-6 col-md-3 col-sm-6">
                                <div className="f_social_icon_two text-center">
                                    {
                                        FooterData.socialIcon.map(item => {
                                            return (
                                                <a href="/" key={item.id}><i className={item.icon}></i></a>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
export default FooterTwo;