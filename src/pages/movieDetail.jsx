import React from 'react'


class MovieDetail extends React.Component{
    render(){
        return(
            <div className="">
                <div className="bgVideo">
                    <iframe width="100%" height="400" src="https://www.youtube.com/embed/_gBnmKOixDM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div className="row justify-content-center">
                    <div className="content">
                        <div className="row">
                            <div className='col-md-2 kotak  '>
                                <img src="https://m.media-amazon.com/images/M/MV5BNGJlYjVkMjQtN2NlZC00NTJhLThmZjItMTRlZDczMmE3YmI3XkEyXkFqcGdeQXVyMzI0NDc4ODY@._V1_UX182_CR0,0,182,268_AL_.jpg" alt=""/>
                            </div>
                            <div className='col-md-10 kotak'>
                                <div className="contentBox">
                                    <div className="titleDetail">Jason Bourne</div>
                                    <div className="sutradaraDetail">Paul Greengrass</div>
                                    <div className="genreDetailDiv"><span className="genreDetail">Action</span></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default MovieDetail;