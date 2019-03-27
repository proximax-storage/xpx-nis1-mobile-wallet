import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  posts:Array<any>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.posts.push({
      title: 'ProximaX File It!, Vault and Notes - Open Beta Test',
      description:'Inviting members of our community to test the ProximaX File It, Vault & Notes applications.',
      content:`<div class="kg-card-markdown"><p>We are delighted to invite members of the community to beta test our File It!, Vault and Notes apps.</p>
      <p>The link for these apps are available via ProximaX Suite as follows:</p>
      <p><a href="https://suite-app.proximax.io/s/DNFFP3eo2fgtjrZ?path=%2F">https://suite-app.proximax.io/s/DNFFP3eo2fgtjrZ?path=%2F</a></p>
      <p><strong>password: proximax</strong></p>
      <h2 id="applications">Applications</h2>
      <p><strong>File It</strong> is a file management system that is used to manage and share files. <strong>Vault</strong> is a password manager to manage sensitive passwords, passphrases or digital keys, and <strong>Notes</strong> is an on-chain, text-based / note application.</p>
      <p>All these applications run on desktop using JavaFX as their front-end technology and are powered by our Proximax Sirius platform (Blockchain and DFMS). By default, they all use several encryption schemes to protect data and currently utilise our Test Network.</p>
      <h2 id="reportingissuesandimprovements">Reporting Issues and Improvements</h2>
      <p>Given that the applications are still in beta, we expect to make more changes to these apps in the upcoming weeks. With your help, we hope to further enhance and improve these apps.</p>
      <p>To report issues or improvements, please log on to the public trello board below using the appropriate label to give us feedback.</p>
      <p><a href="https://trello.com/b/nVu5ZxqN/proximaxtestnetapps">https://trello.com/b/nVu5ZxqN/proximaxtestnetapps</a></p>
      </div>`,
      image: 'https://blog.proximax.io/content/images/2019/03/rendered.png',
      category: 'TECH',
      readTime: '1',
      expanded: false
    })

    this.posts.push({
      title: 'ProximaX Technology Blog - February 2019',
      description:`The development of the core ProximaX technical team is always committed to advancing technology development to ensure that we successfully achieve this year's work goals.`,
      content:`<div class="kg-card-markdown"><p><strong><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">The development of the core</font></font></strong><br><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> 
      ProximaX technical team is always committed to advancing technology development to ensure that we successfully achieve this year's work goals. </font><font style="vertical-align: inherit;">We have conducted internal discussions on design methods, proper use of models, changes to signature schemes, and research. </font><font style="vertical-align: inherit;">These actions help to further enhance our platform capabilities.</font></font></p>
      <p><strong><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Blockchain - Merge NEM Cow</font></font></strong><br><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> 
      NEM Tech (created by Tech Bureau Corporation) to continuously update its server code, and Cow's update complements our source code library. </font><font style="vertical-align: inherit;">For us, Cow's most important updates are reflected in costing strategies and different signature schemes. </font><font style="vertical-align: inherit;">The cost calculation strategy will be validated against our own token economic design and combined with our incentives.</font></font></p>
      <p><img src="/content/images/2019/03/20190325---ProximaX-Tech-February--Chinese----Image-1.png" alt="20190325---ProximaX-Tech-February--Chinese----Image-1"></p>
      <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">A high-level operational flow chart solution for the use of XPX tokens and stable coins.</font></font></p>
      <p><strong><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Storage / DFMS</font></font></strong><br><font style="vertical-align: inherit;"><font style="vertical-align: inherit;"> 
      Our focus in February is to refactor the current storage platform. </font><font style="vertical-align: inherit;">At present, our researchers and auditors are constantly working on code improvements to implement major changes to our core models and conventions and to validate the results. </font><font style="vertical-align: inherit;">With this new structure, we can more easily extend and modify the storage platform. </font><font style="vertical-align: inherit;">Once we put it into use, public contributors will also be able to use the storage platform.</font></font></p>
      <p><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">We take the drive/directory feature very seriously. </font><font style="vertical-align: inherit;">This feature basically allows customers to rent some reserved space, which can be used to store multiple files and folders - regardless of their number and structure. </font><font style="vertical-align: inherit;">The only limiting factor is the drive size, but you can avoid this limitation by using multiple drives.</font></font></p>
      <p>我们还已开始编写将与社区共享的存储技术文档。文档内容将涵括包括我们的REST API和SDKs在内的所有技术规范和操作指南。从DFMS GO SDK作为参考实现开始，公共DFMS将拥有属于自己的一组SDK。这将成为客户端 / DAapps用来与存储层通信的主流SDK，它还将用作存储网络上的瘦客户端参与者。</p>
      <p><img src="/content/images/2019/03/20190325---ProximaX-Tech-February--Chinese----Image-2.png" alt="20190325---ProximaX-Tech-February--Chinese----Image-2"></p>
      <p><strong>文件存储归属 / 权益证明</strong><br>
      我们正在完结文件存储中的权益证明。该证明将向大家概括性地介绍为确保实现公平的经济激励而将采取的权益证明机制。我们正在将这些最新更新添加到高层次设计文档中去。</p>
      <p>简而言之，文件存储权益将基于动态权益证明方案。该方案是一种依赖于当地存储需求的更为经济、公平的操作方式。它将XPX代币的余额作为存储节点参与权的保证金。实施权益归属旨在激励存储节点参与者为平台用户提供尽可能高的服务质量。本文报告了实施文件存储权益归属的好处，并考虑了如何将排列效率最大化。</p>
      <p>我们将就相关内容发布更为详细的讯息，敬请关注。</p>
      <p><strong>测试网络的初期访问程序</strong><br>
      到3月底 - 4月初的时候，我们将为想要试用测试网络的开发人员推出一个初期访问程序。届时，我们将邀请一些我们认识的程序员及想要尝试在我们的测试网络平台上构建应用程序的企业参与试用。</p>
      <p>截至目前，我们正在为初期访问程序创建一个结构化流程。我们正在着手清理所有访问、SDKs和支持系统以促成该计划的完美施行。</p>
      <p><strong>更新ProximaX 网络钱包</strong><br>
      我们对网络钱包做了进一步的更新，现在任何人都可以访问它。</p>
      <p>更新内容包括：</p>
      <ol>
      <li>支持创建和修改Mosaic马赛克。</li>
      <li>支持创建和修改命名空间。</li>
      <li>优化交易面板。</li>
      <li>修复显示交易时速度慢的问题。</li>
      <li>添加交易明细类别。</li>
      <li>开放命名空间注册功能。</li>
      <li>Mosaic马赛克供应变化。</li>
      <li>Mosaic马赛克定义。</li>
      <li>在缓存中临时存储Mosaic马赛克和命名空间。</li>
      <li>更改钱包UI。</li>
      <li>将Mosaic马赛克选择添加到传输模块。</li>
      </ol>
      <p>您可以通过登录http://bctestnetwallet.xpxsirius.io 访问我们的测试网站，体验最新的网络钱包。</p>
      <p>我们将不断更新网络钱包，使其与我们的区块链变化相同步。我们将很快推出一个基于存储和流媒体的应用程序来补充我们的存储和流媒体层。</p>
      <p><strong>进一步优化ProximaX 浏览器</strong><br>
      我们重新设计并重建了ProximaX浏览器来使用VueJs。此举提升了浏览器性能并显著减少了发行版本的规模。这些改进是为了确保我们的客户能够以一种更为直观的方式来访问区块链浏览器中的数据。</p>
      <p>我们将把这个浏览器与我们所有的私有 / 许可的产品相绑定。</p>
      <p>您可以通过登录http://bctestnetexplorer.xpxsirius.io/ 访问我们的测试网站，体验最新的ProximaX 浏览器。</p>
      <p><strong>我们正在开展的其他工作<br>
      身份系统概念认证Identity System Proof of Concept (PoC)</strong><br>
      我们已经开始着手研究身份认证系统概念认证PoC。这是一个通用 / 抽象的解决方案，可以通过对SDK进行扩展来使客户端 / 用户通过其应用程序或设备(嵌入式)进行身份验证的过程。</p>
      <p>身份认证系统概念认证PoC包括了近场通信（Near-field communication ，NFC)）、前端、后端和 ProximaX Sirius 平台，共计4层内容。 该系统的特点如下：具有注册功能；数据嵌入在NFC上并存储于ProximaX Sirius平台中；通过SDK离线进行数据验证；通过可自定义的表单来实现扩展。</p>
      <p>我们将很快发布该应用的实时演示视频。</p>
      <p><strong>工作流引擎</strong><br>
      我们正着手开发一个由ProximaX Sirius平台支持的工作流引擎，以作为不可变流程状态下的存储工具。这是一个非常强大的应用程序，它将使企业能够利用ProximaX内置的预定义契约 / 插件来构建高度可定制的工作流。</p>
      <p><img src="/content/images/2019/03/20190325---ProximaX-Tech-February--Chinese----Image-3.png" alt="20190325---ProximaX-Tech-February--Chinese----Image-3"></p>
      <p><strong>小结</strong><br>
      现在，我们将2月份工作进程总结如下：</p>
      <ul>
      <li>NEMCow更新，并与ProximaX Sirius平台进行合并。</li>
      <li>进一步发展存储/工作流层技术，启动通证经济模式的整合工作。</li>
      <li>文件存储归属的仿真与研究。</li>
      <li>介绍测试网络初期访问程序的规划。</li>
      <li>开发身份系统概念认证PoC和工作流引擎</li>
      </ul>
      </div>`,
      image: 'https://blog.proximax.io/content/images/2019/03/20190325---PROXIMAX-TECH_FEBRUARY-2019_chinese.jpg',
      category: 'TECH',
      readTime: '7',
      expanded: false
    })

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  showMore(post){

    this.posts.map((_post) => {

        if(post.title == _post.title){
            _post.expanded = !_post.expanded;
        } else {
            _post.expanded = false;
        }

        return _post;

    });

}

}
