import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NemProvider } from '../../../providers/nem/nem';
import { Node, NodeEndpoint, ServerConfig, Protocol, NodeHttp } from 'nem-library';
import { Storage } from '@ionic/storage';
import { AlertProvider } from '../../../providers/alert/alert';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the NodeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-node-list',
  templateUrl: 'node-list.html',
})
export class NodeListPage {
 
  public blockHeight: number  = 0;
  public nodes: Array<Node>;
  public node: Node;
  currentNode: string = "";
  selectedNode: NodeEndpoint;

  formGroup: FormGroup
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private nem: NemProvider,
    private storage: Storage,
    private viewCtrl: ViewController,
    private formBuilder: FormBuilder,
    private alertProvider: AlertProvider,
    private http: HttpClient
    ) {
     
      this.getInfo();

      this.formGroup = this.formBuilder.group({
        ipAddress: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15), Validators.pattern("^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")]],
      });

  }

  getInfo() {
    this.nem.getBlockHeight().then(block=> {
      console.log("LOG: NodeListPage -> block", block);
        this.blockHeight = block.height;
      })

      this.nem.getActiveNodes().then((nodes: Array<Node>) => {
      console.log("LOG: NodeListPage -> nodes", nodes);
      //  this.nodes = nodes;

      let alice = nodes.filter( node => {
         return node.identity.name.includes('Alice')
      });

      this.nodes = alice;

      console.log("LOG: NodeListPage -> getInfo -> results", alice);
      });

      this.nem.getActiveNode().then((node: Node)=>{
        console.log("LOG: NodeListPage -> node", node);
        this.node = node;
        // this.currentNode = this.node.endpoint.protocol + '://' + this.node.endpoint.host + ':' +this.node.endpoint.port
        this.currentNode = this.node.identity.name;
        
      })
  }

  getNodeInfo(node: Node) {
    // return node.endpoint.protocol + '://' + node.endpoint.host + ':' + node.endpoint.port
    return node.identity.name;
  }

  onChange() {
    this.validateIPaddress(this.selectedNode.host);
    // this.switchNode(this.selectedNode.protocol, this.selectedNode.host, this.selectedNode.port)
    
  }


   switchNode(protocol="http", host:string, port=7890){

    let serverConfig: ServerConfig = { protocol: protocol as Protocol, domain: host, port: port};
    console.log("LOG: NodeListPage -> onChange -> serverConfig", serverConfig);

    this.storage.set("node", JSON.stringify(serverConfig)).then( _=>{
      console.log(_);

      this.alertProvider.showMessage("You are about to switch node.");


      setTimeout(()=> {
        window.location.reload();
      }, 1000)
      
      

    })
  }

  onSubmit(form) {
    this.validateIPaddress(form.ipAddress)
  }

  validateIPaddress(ipaddress) 
  {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
    {
      try {

        let url = "http://" + ipaddress + ":7890/node/info";
          let headers = new HttpHeaders();
          this.http.get(url, { headers: headers })
            .toPromise()
            .then(response => { 
              console.log("LOG: NodeListPage -> response", response);
              this.switchNode("http", ipaddress, 7890)
             })
            .catch((response: Response) => {
              console.log("LOG: NodeListPage -> response", response);
              this.alertProvider.showMessage("Invalid node. Please try again.");
             });
      } catch (error) {
				console.log("LOG: NodeListPage -> error", error);
      }

      
    } else {
      this.alertProvider.showMessage("The IP Address provided is invalid!");
    }
  } 


  ionViewDidLoad() {
    console.log('ionViewDidLoad NodeListPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
