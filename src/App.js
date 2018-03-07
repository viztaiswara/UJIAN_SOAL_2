import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(){
    super();
    this.state={nama:'',team:[]}
  }
  klik(){
    this.setState({nama: this.refs.nama.value});
  }
  klik2(){
    var x=this.state.nama;
    axios.get('https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?t='+x).then((ambilData)=>{
      console.log(ambilData.data.player);
      this.setState({
        team:ambilData.data.player,
      })
    })
  }
  render() {
    const data = this.state.team.map((item,index)=>{
      var name = item.strPlayer;
      var post = item.strPosition;
      var img = item.strThumb;
      var desc = item.strDescriptionEN
      return <div className="row"><div className="col-xs-12 col-lg-12"><div className="panel panel-primary"><div className="panel-heading"><h4><b>{name}({post})</b></h4></div><div className="panel-body"><div className="col-lg-4"><img src={img} alt="ok"/></div><div className="col-lg-8"><p>{desc}</p></div></div></div></div></div>
    })
    return (
      <div className="container">
        <center>
          <h1>Daftar Pemain {this.state.nama}</h1>
          <div className="row">
            <div className="col-md-8">
              <input className="form-control" ref="nama" type="text" onInput={()=>{this.klik();}}/>
            </div>
            <div className="col-md-4">
              <button type="submit" className="btn btn-success btn-block" onClick={()=>{this.klik2();}}>Lihat Daftar</button>
            </div>
          </div>
        </center>
        <br/>
        {data}
      </div>
    );
  }
}

export default App;
