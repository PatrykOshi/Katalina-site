import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Nav from './components/nav';
import Footer from './components/footer';
import SideSection from './components/sideSection';
import GalleryComponent from './galleryComponent';
import Data from './data';
import './css/gallery.css'


class Gallery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: this.loadJsonData(),
            colection: parseInt(props.match.params.col != null ? props.match.params.col : null),
            news: parseInt(props.match.params.news != null ? props.match.params.news : null),
            all: null,
            loading: false,
            howManyInRow: 4,
            width: window.innerWidth
        };

    }

    componentWillReceiveProps(){
        this.forceUpdate();
    }


    componentDidMount() {
        window.scrollTo(0, 0);
        this.handleResizeEvent();
        this.handleLoad();
    }

    componentDidUpdate(){
        this.handleLoad();
    }
    handleLoad = () =>{

        if(!this.state.loading){
            let interval = setInterval(() =>{
                if(document.readyState === 'complete') {
                    clearInterval(interval);
                    this.setState({
                        loading: true
                    });
                    window.addEventListener("load", () => {
                        alert('done');
                    });
                }
            }, 500);
        }
    };



    handleResizeEvent = () => {
        window.addEventListener('resize', () => {
            this.setState({
                width: window.innerWidth
            });
        });
    };


    loadJsonData = () => {
        return Data;
    };

    getColNumbers = (inRow) =>{
        switch (inRow){
            case 1:
                return 12;
            case 2:
                return 6;
            case 3:
                return 4;
            case 4:
                return 3;
            case 6:
                return 2;
            default:
                return 3;
        }
    };

    getContent = () =>{
        let data;
        let jsx = [];
        if(!isNaN(this.state.colection)){
            if(!isNaN(this.state.news)){
                data = this.state.data[this.state.colection].news[this.state.news];
                for(let i = 1; i < data.length;i++){
                    for(let j = 1; j < data[i].length; j++){
                        for(let x = 0; x < data[i][j].length; x++){
                            jsx.push(
                                <GalleryComponent
                                    key={`${i}${j}${x}`}
                                    valueForKey={`${i}${j}${x}`}
                                    img={data[i][j][x].img2}
                                    name={data[i][0]}
                                    color={data[i][j][x].color}
                                    collection={this.state.data[this.state.colection].name}
                                    colLink={this.state.colection}
                                    newsLink={this.state.news}
                                    modeLink={i}
                                    colorLink={x}
                                    row={this.getColNumbers(this.state.howManyInRow)}
                                />
                            )
                        }
                    }
                }
            }
            else{
                data = this.state.data[this.state.colection].news;
                let tmp =0;
                for(let i = 0; i < data.length; i++){
                    for(let j = 1; j < data[i].length; j++){
                        for(let x = 1; x< data[i][j].length; x++){
                            for(let y = 0; y<data[i][j][x].length; y++){
                                jsx.push(
                                    <GalleryComponent
                                        key={`${tmp++}${i}${j}${x}`}
                                        valueForKey={`${i}${j}${x}`}
                                        img={data[i][j][x][y].img2}
                                        name={data[i][j][0]}
                                        color={data[i][j][x][y].color}
                                        collection={this.state.data[this.state.colection].name}
                                        colLink={this.state.colection}
                                        newsLink={i}
                                        modeLink={j}
                                        colorLink={y}
                                        row={this.getColNumbers(this.state.howManyInRow)}
                                    />
                                )

                            }
                        }
                    }
                }

            }

        }
        else{
            data = this.state.data;
            let tmp = 0;
            for(let i = 1; i<data.length;i++){ //kolekcje
                for(let j = 0; j<data[i].news.length; j++){ // nowosci
                    for(let k = 1; k<data[i].news[j].length; k++){ // modele
                        for(let z = 1; z < data[i].news[j][k].length; z++){
                            for(let x = 0; x < data[i].news[j][k][z].length; x++){
                                if(this.state.all === null){
                                    if(x === 0){
                                        jsx.push(
                                            <GalleryComponent
                                                key={`${tmp++}${i}${j}${x}`}
                                                valueForKey={`${i}${j}${x}`}
                                                img={data[i].news[j][k][z][x].img2}
                                                name={data[i].news[j][k][0]}
                                                color={data[i].news[j][k][z][x].color}
                                                collection={data[i].name}
                                                colLink={i}
                                                newsLink={j}
                                                modeLink={k}
                                                colorLink={x}
                                                row={this.getColNumbers(this.state.howManyInRow)}
                                            />
                                        )
                                    }
                                }
                                else{
                                    jsx.push(
                                        <GalleryComponent
                                            key={`${tmp++}${i}${j}${x}`}
                                            valueForKey={`${i}${j}${x}`}
                                            img={data[i].news[j][k][z][x].img2}
                                            name={data[i].news[j][k][0]}
                                            color={data[i].news[j][k][z][x].color}
                                            collection={data[i].name}
                                            colLink={i}
                                            newsLink={j}
                                            modeLink={k}
                                            colorLink={x}
                                            row={this.getColNumbers(this.state.howManyInRow)}
                                        />
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }

        return(
            jsx
        );
    };

    showHideAll = () =>{
        if(this.state.all === null){
            this.setState({
                all: true,
                loading: false
            });
        }
        else{
            this.setState({
                all: null,
                loading: false
            });
        }
    };

    setRows = (e) => {
        this.setState({
            howManyInRow: parseInt(e.target.value),
            loading: false
        });
    };

    onLinksClck = (col, news) =>{
        this.setState({
            colection: col,
            news: news
        });
    };
    render(){
        return (
            <div>
                <Nav currentWidth={this.state.width} />
                <div className="spacer">
                </div>
                <div className="container-fluid">
                    <SideSection width={this.state.width} setPage={this.onLinksClck} data={this.state.data}/>
                    <div className="row">
                        <div className="col-0 col-md-3" style={{zIndex:"-10000"}}> </div>
                        <div className="col-12 col-md-9">

                            <div className="container-fluid" style={{paddingTop:"15px"}}>
                                <div className="row">
                                    {this.state.width > 750 && <label className="labelsForGallery" htmlFor="selectForAmountOfRows">Liczba oprawek w rzędzie:</label>}
                                    {this.state.width > 750 && <select id="selectForAmountOfRows" className="form-control col-12 col-md-1" onChange={this.setRows} >
                                        <option value={1} >1</option>
                                        <option value={2} >2</option>
                                        <option value={3} >3</option>
                                        <option value={4} selected >4</option>
                                        <option value={6} >6</option>
                                    </select>}
                                    <div className="col">
                                        <label className="labelsForGallery" htmlFor="allOrNotAll">Pokaż wszystko</label>
                                        <input id="allOrNotAll" type="checkbox" disabled={this.props.match.params.col? 'true':''} onClick={this.showHideAll}/>
                                    </div>
                                    <Link to="/#top">
                                        <button type="button" className="btn btn-outline-dark"><i className="fas fa-undo"> </i> Wróć do strony głównej</button>
                                    </Link>

                                </div>
                            </div>

                            {!this.state.loading &&
                            <div>
                                <div className="container" ref={this.spinner} >
                                    <div className="row text-center">
                                        <i className="fa fa-spinner fa-spin col" style={{fontSize:"100px", marginTop:"15px", marginBottom:"15px"}}> </i>
                                    </div>
                                </div>
                            </div>
                            }

                            {this.state.loading && <div className="row fadeIn animated">
                                {this.getContent()}
                            </div>}
                        </div>
                    </div>
                </div>
                <Footer noDevider={true}/>
            </div>
        );
    }

}

export default Gallery;