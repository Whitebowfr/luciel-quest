export const theEntireInternet = {
    "https://www.gogol.com": "Ceci est Gogole (TM)",
    "https://www.downloadTester.com": `<button onClick="document.dispatchEvent(new CustomEvent('download', {'detail': 'https://www.downloadTester.com/downloadRandomFile'}))">Download</button>`,
    "side://history": `<style>
    .history_wrapper {
      width: 100%;
    }
    
    .history_wrapper >  div:nth-of-type(odd) {
      background-color: rgb(223, 223, 223);
    }
    
    .history_wrapper >  div:nth-of-type(even) {
      background-color: white;
    }
    
    .history {
      width: 100%;
      display: flex;
      max-height: 75px;
      cursor: pointer;
      border: 1px solid black;
    }
    
    .history > p {
      margin: 0;
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 5px;
      font-size: 1.2rem;
      font-family: Poppins, 'Segoe UI', Tahoma, sans-serif;
    }
    
    .history > img {
      height: 1.3rem;
      width: auto;
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 20px;
    }
    
    .history_date {
      margin: 0;
      margin-bottom: 10px;
    }
  </style>
  
  <p style="color: gray; font-style: italic; text-align: center;">Suite à une mise à jour de vos paramètres de sécurité, votre historique n'est plus mis à jour depuis une semaine.</p>
  <h4 class="history_date">
    Mercredi 3 mai :
  </h4>
  <div class="history_wrapper">
    <div class="history" onclick="goto('http://89.33.256.12:9001/goodies.html')">
      <img src="https://cdn-icons-png.flaticon.com/512/5341/5341357.png"/>
      <p>
        89.33.256.12:9001/goodies.html
      </p>
    </div>
    <div class="history" onClick="goto('http://89.33.256.12:9001/home.html')">
      <img src="https://cdn-icons-png.flaticon.com/512/5341/5341357.png"/>
      <p>
        89.33.256.12:9001/home.html
      </p>
    </div>
    <div class="history" onClick="goto('https://gogol.com/search?q=how+to+hak+a+file&page=2')">
      <img src="https://i.redd.it/fy0t7gpd36u51.png" style="filter:grayscale(100%) blur(0.5px)"/>
      <p>
        gogol.com/search?q=how+to+hak+a+file - Page 3
      </p>
    </div>
    <div class="history" onClick="goto('https://gogol.com/search?q=how+to+hak+a+file&page=2')">
      <img src="https://i.redd.it/fy0t7gpd36u51.png" style="filter:grayscale(70%)"/>
      <p>
        gogol.com/search?q=how+to+hak+a+file - Page 2
      </p>
    </div>
    <div class="history" onClick="goto('https://gogol.com/search?q=how+to+hak+a+file')">
      <img src="https://i.redd.it/fy0t7gpd36u51.png"/>
      <p>
        gogol.com/search?q=how+to+hak+a+file
      </p>
    </div>
    <div class="history" onClick="goto('https://gogol.com/search?q=unreadable+file+in+File+Explorer')">
      <img src="https://i.redd.it/fy0t7gpd36u51.png"/>
      <p>
   gogol.com/search?q=unreadable+file+in+File+Explorer
      </p>
    </div>
  </div>
  <script>
    function goto(url) {
      let event = new CustomEvent('url_redirect', {'detail': url})
      document.dispatchEvent(event)
    }
  </script>
    `,
    "https://www.passwordRecovery.com/abcdefghij": `
    <script>
        function testb() {
            if (document.getElementById("recovery_question").value.toLowerCase() !== "troyes") {
                document.getElementById("info").innerText = "Réponse érronée.";
                document.getElementById("info").classList.add("error");
            } else {
                document.getElementById("info").innerText = "Réponse correcte ! Voici votre mot de passe : dsjklghuiojsdfg9284mù+&ù";
                document.getElementById("recovery_question").disabled = true;
                document.getElementById("info").classList.remove("error");
                document.getElementById("info").classList.add("success");
            }
        }

        function checkEnter() {
            if (event.key === "Enter") testb();
        }
    </script>
    <h4>Récupération de mot de passe</h4>
    Avant de vous donner votre mot de passe, nous devons vérifier votre identité.
    </br>
    Veuillez répondre à la question de sécurité ci-dessous.
    </br>
    <h5>Où êtes-vous allés pour la dernière fois en vacances ?</h5>
    <input type="text" autocomplete="off" id="recovery_question" onkeydown="checkEnter()"/> <button onClick="testb()">Soumettre</button>
    <p id="info"></p>
    <style>
        .error {
        color: red
        }
        
        .success {
        color: green
        }
    </style>
    `,
    "http://89.33.256.12:9001/home.html" : `
    <style>
    .body{ 
    width: 100%;
    height: 100%;
    margin: 0;
    background: #131313;
    color: #fff;
    }

    .body > .navbar {
    max-height: 40vh;
    background-color: rgb(30, 30, 30);
    width: 100%;
    height: fit-content;
    display: block;
    }

    .title {
    margin-left: 20px;
    padding-right: 50px;
    display: inline-block;
    }

    .selected {
        color: black;
        background-color: white;
    }

    .button {
    padding: 6px;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 50px;
    display: inline-block;
    }

    .button:not(.selected) {
    border-left: 1px solid white
    }

    .content {
    max-width: 70%;
    margin-top: 20px;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
    background-color: gray;
    min-height: 10%;
    display: block;
    }

    .article {
    border: 1px solid black;
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 20px;
    }

    .article_title {
    margin-top: 5px;
    margin-bottom: 5px;
    cursor: pointer;
    }
    </style>
    <script>function goto(url) {
        let event = new CustomEvent('url_redirect', {'detail': url})
        document.dispatchEvent(event)
    }</script>
    <div class="body">
    <div class="navbar">
    <h3 class="title">H@CKER NEWs</h3>
    <h4 class="button selected">HOME</h4>
    <h4 class="button" onclick="goto('http://89.33.256.12:9001/goodies.html')">GOODIES</h4>
    </div>
    <div class="content">
        <div class="article" onclick="goto('http://89.33.256.12:9001/dragon-breath-apt-group-using-double.html')" title='http://89.33.256.12:9001/dragon-breath-apt-group-using-double.html'>
        <h4 class="article_title">Dragon Breath APT Group Using Double-Clean-App Technique to Target Gambling Industry</h4>
    </div>
    <div class="article" onclick="goto('http://89.33.256.12:9001/cmd-tips.html')" title='http://89.33.256.12:9001/cmd-tips.html'>
        <h4 class="article_title">How to use CMD to remote hack into someone else's computer</h4>
    </div>
    <div class="article" onclick="goto('http://89.33.256.12:9001/new-vulnerability-in-popular-wordpress.html')" title='http://89.33.256.12:9001/new-vulnerability-in-popular-wordpress.html'>
        <h4 class="article_title">New Vulnerability in Popular WordPress Plugin Exposes Over 2 Million Sites to Cyberattacks</h4>
    </div>
    <div class="article" onclick="goto('http://ba8e:6a56:f95a:b5a7:0c1f:a7e4:a01d:6242/')" title='http://ba8e:6a56:f95a:b5a7:0c1f:a7e4:a01d:6242/'>
        <h4 class="article_title">Get This Free Tool and Decrypt Any File Easily [NOT A SCAM] [TRUST ME BRO]</h4>
    </div>
    </div></div>
    `,
    "http://89.33.256.12:9001/dragon-breath-apt-group-using-double.html" : `
    <script>
    function goto(url) {
        let event = new CustomEvent('url_redirect', {'detail': url})
        document.dispatchEvent(event)
    }
    </script>
    <style>
    .body{ 
        width: 100%;
        height: 100%;
        margin: 0;
        background: #131313;
        color: #fff;
    }
    
    .body > .navbar {
        max-height: 40vh;
        background-color: rgb(30, 30, 30);
        width: 100%;
        height: fit-content;
        display: block;
    }
    
    .title {
        margin-left: 20px;
        padding-right: 50px;
        display: inline-block;
    }
    
    .button {
        padding: 6px;
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 50px;
        display: inline-block;
    }
    
    .button:not(.selected) {
        border-left: 1px solid white
    }
    
    .content {
        max-width: 70%;
        margin-top: 20px;
        padding: 10px;
        margin-left: auto;
        margin-right: auto;
        background-color: gray;
        min-height: 10%;
        display: block;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    </style>
    <div class="body">
    <div class="navbar">
    <h3 class="title">H@CKER NEWs</h3>
    <h4 class="button" onclick="goto('http://89.33.256.12:9001/home.html')">HOME</h4>
    <h4 class="button" onclick="goto('http://89.33.256.12:9001/goodies.html')">GOODIES</h4>
    </div>
    <div class="content" style="">    An advanced persistent threat (APT) actor known as Dragon Breath has been observed adding new layers of complexity to its attacks by adopting a novel DLL side-loading mechanism.

    "The attack is based on a classic side-loading attack, consisting of a clean application, a malicious loader, and an encrypted payload, with various modifications made to these components over time," Sophos researcher Gabor Szappanos said.

    "The latest campaigns add a twist in which a first-stage clean application 'side'-loads a second clean application and auto-executes it. The second clean application side-loads the malicious loader DLL. After that, the malicious loader DLL executes the final payload."

    Operation Dragon Breath, also tracked under the names APT-Q-27 and Golden Eye, was first documented by QiAnXin in 2020, detailing a watering hole campaign designed to trick users into downloading a trojanized Windows installer for Telegram.

    A subsequent campaign detailed by the Chinese cybersecurity company in May 2022 highlighted the continued use of Telegram installers as a lure to deploy additional payloads such as gh0st RAT.

    Dragon Breath is also said to be part of a larger entity called Miuuti Group, with the adversary characterized as a "Chinese-speaking" entity targeting the online gaming and gambling industries, joining the likes of other Chinese activity clusters like Dragon Castling, Dragon Dance, and Earth Berberoka.</div>
    </div>
    `,
    "http://89.33.256.12:9001/new-vulnerability-in-popular-wordpress.html" : `
    <script>
    function goto(url) {
    let event = new CustomEvent('url_redirect', {'detail': url})
    document.dispatchEvent(event)
    }
    </script>
    <style>
    .body{ 
    width: 100%;
    height: 100%;
    margin: 0;
    background: #131313;
    color: #fff;
    }

    .body > .navbar {
    max-height: 40vh;
    background-color: rgb(30, 30, 30);
    width: 100%;
    height: fit-content;
    display: block;
    }

    .title {
    margin-left: 20px;
    padding-right: 50px;
    display: inline-block;
    }

    .button {
    padding: 6px;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 50px;
    display: inline-block;
    }

    .button:not(.selected) {
    border-left: 1px solid white
    }

    .content {
    max-width: 70%;
    margin-top: 20px;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
    background-color: gray;
    min-height: 10%;
    display: block;
    white-space: pre-wrap;
    word-wrap: break-word;
    }
    </style>
    <div class="body">
    <div class="navbar">
    <h3 class="title">H@CKER NEWs</h3>
    <h4 class="button" onclick="goto('http://89.33.256.12:9001/home.html')">HOME</h4>
    <h4 class="button" onclick="goto('http://89.33.256.12:9001/goodies.html')">GOODIES</h4>
    </div>
    <div class="content" style="">Users of Advanced Custom Fields plugin for WordPress are being urged to update version 6.1.6 following the discovery of a security flaw.

    The issue, assigned the identifier CVE-2023-30777, relates to a case of reflected cross-site scripting (XSS) that could be abused to inject arbitrary executable scripts into otherwise benign websites.

    The plugin, which is available both as a free and pro version, has over two million active installations. The issue was discovered and reported to the maintainers on May 2, 2023.

    "This vulnerability allows any unauthenticated user from stealing sensitive information to, in this case, privilege escalation on the WordPress site by tricking a privileged user to visit the crafted URL path," Patchstack researcher Rafie Muhammad said.

    Reflected XSS attacks usually occur when victims are tricked into clicking on a bogus link sent via email or another route, causing the malicious code to be sent to the vulnerable website, which reflects the attack back to the user's browser.

    This element of social engineering means that reflected XSS does not have the same reach and scale as stored XSS attacks, prompting threat actors to distribute the malicious link to as many victims as possible.

    "[A reflected XSS attack] is typically a result of incoming requests not being sufficiently sanitized, which allows for the manipulation of a web application's functions and the activation of malicious scripts," Imperva notes.</div></div>
    `,
    "http://89.33.256.12:9001/goodies.html" : `
    <style>
    .body{ 
    width: 100%;
    height: 100%;
    margin: 0;
    background: #131313;
    color: #fff;
    max-height: 80vh;
    overflow: scroll;
    }

    .body > .navbar {
    max-height: 40vh;
    background-color: rgb(30, 30, 30);
    width: 100%;
    height: fit-content;
    display: block;
    }

    .title {
    margin-left: 20px;
    padding-right: 50px;
    display: inline-block;
    }

    .selected {
        color: black;
        background-color: white;
    }

    .button {
    padding: 6px;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 50px;
    display: inline-block;
    }

    .button:not(.selected) {
    border-left: 1px solid white
    }

    .content {
    max-width: 70%;
    margin-top: 20px;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
    background-color: gray;
    min-height: 10%;
    display: block;
    }

    .article {
    background-color: white;
    width: fit-content;
    padding: 10px;
    text-align: center;
    display: inline-block;
    }

    .article > img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    }

    .price {
    margin: 10px;
    color: black;
    }

    .warning {
    color: red;
    margin-top: 5px;
    margin-bottom: 0;
    }
    </style>
    <script>
    function goto(url) {
        let event = new CustomEvent('url_redirect', {'detail': url})
        document.dispatchEvent(event)
    }
    </script>
    <div class="body">
    <div class="navbar">
    <h3 class="title">H@CKER NEWs</h3>
    <h4 class="button" onclick="goto('http://89.33.256.12:9001/home.html')">HOME</h4>
    <h4 class="button selected">GOODIES</h4>
    </div>
    <div class="content">
    <div class="article">
        <img src="https://cdn.media.amplience.net/s/hottopic/14794795_hi?$productMainDesktop$"/>
        <h4 class="price">64.99$</h4>
        <h4 class="warning">UNAVAILABLE</h4>
    </div>
    <div class="article">
        <img src="https://img.fruugo.com/product/6/62/151054626_max.jpg"/>
        <h4 class="price">169.99$</h4>
        <h4 class="warning">UNAVAILABLE</h4>
    </div>
    <div class="article">
        <img src="https://cdn.dribbble.com/users/2138976/screenshots/18173759/media/077e89d2cdc0a7313e0aab318e537fcc.png?compress=1&resize=400x300&vertical=top"/>
        <h4 class="price">69.99$</h4>
        <h4 class="warning">UNAVAILABLE</h4>
    </div>
    </div>
    </div>
    `,
    "http://89.33.256.12:9001/cmd-tips.html" : `
    <script>
    function goto(url) {
        let event = new CustomEvent('url_redirect', {'detail': url})
        document.dispatchEvent(event)
    }
    </script>
    <style>
    .body{ 
        width: 100%;
        height: 100%;
        margin: 0;
        background: #131313;
        color: #fff;
    }
    
    .body > .navbar {
        max-height: 40vh;
        background-color: rgb(30, 30, 30);
        width: 100%;
        height: fit-content;
        display: block;
    }
    
    .title {
        margin-left: 20px;
        padding-right: 50px;
        display: inline-block;
    }
    
    .button {
        padding: 6px;
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 50px;
        display: inline-block;
    }
    
    .button:not(.selected) {
        border-left: 1px solid white
    }
    
    .content {
        max-width: 70%;
        margin-top: 20px;
        padding: 10px;
        margin-left: auto;
        margin-right: auto;
        background-color: gray;
        min-height: 10%;
        display: block;
    }

    .content > h3 {
        margin: 0
    }
    </style>
    <div class="body">
    <div class="navbar">
    <h3 class="title">H@CKER NEWs</h3>
    <h4 class="button" onclick="goto('http://89.33.256.12:9001/home.html')">HOME</h4>
    <h4 class="button" onclick="goto('http://89.33.256.12:9001/goodies.html')">GOODIES</h4>
    </div>
    <div class="content"><span style="font-style: italic; color: white">Traduit de l'anglais</span><br>
        Lisez bien cette page attentivement si vous comptez un jour devenir un hacker hors pair. Vous y trouverez des astuces et des conseils pour vous aider à devenir le meilleur hacker de tous les temps.<br>
        <br>
        <h3>Commandes de base</h3>
        - <code>help</code> : Affiche les commandes disponibles<br>
        - <code>disconnect</code> : Déconnecte de la session et renvoie sur l'écran de verrouillage <br>
        - <code>ssh -pass [code SSH]</code> : Une fois sur un ordinateur, exécutez cette commande pour récupérer les accès aux fichiers. <br>
        (Note : les commandes suivantes sont accessibles seulement si vous êtes connectés en SSH l'ordinateur cible.) <br>
        - <code>ls</code> : Liste les fichiers et dossiers dans le répertoire courant<br>
        - <code>cd [chemin]</code> : Change le répertoire courant<br>
        - <code>rm [chemin]</code> : Supprime un fichier ou un dossier<br>
        - <code>proglist</code> : Liste les programmes ouverts et les plages d'adresses mémoires associées<br>
        <br>
        <h3>Commandes avancées de piratage</h3>
        - <code>info</code> : Affiche toutes les informations de l'ordinateur sur lequel elle est effectuée<br>
        - <code>netlist</code> : Affiche une carte des adresses IP connectées<br>
        - <code>install -ip [adresse IP]</code> : Installe un malware sur l'ordinateur cible. L'adresse IP doit être accessible depuis l'ordinateur sur lequel on exécute la commande.<br>
        - <code>connect -ip [adresse IP]</code> : Se connecte à une adresse IP après y avoir installé un malware.<br>
        - <code>memedit -a [adresse mémoire]</code> : Après avoir installé un malware, supprime une adresse mémoire d'un programme, causant sa fermeture<br>
        <h4>Et n'oubliez pas de faire une carte des adresses IP visitées pour ne pas vous perdre dans les méandres du réseau !</h4>
    </div>
    </div>
    `,
    "http://ba8e:6a56:f95a:b5a7:0c1f:a7e4:a01d:6242/": `
    <style>
    .body {
        background: #000;
        width: 100%;
        height: 50vh;
   }
   
    .button {
        border: 2px solid #fff;
        color: #fff;
        font-family: 'RobotoMono', monospace;
        padding: 25px;
        width: 170px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        vertical-align: middle;
        text-align: center;
        position: absolute;
   }
   
    .button:hover {
        cursor: pointer;
   }
    .button:hover span.caption:after {
        animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
   }
    .button:hover span.caption:before {
        animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
   }
   span.caption {
    user-select: none;
   }

    span.caption:after, span.caption:before {
        padding: 25px;
        width: 170px;
        content: 'Download';
        position: absolute;
        top: -2px;
        left: -2px;
        opacity: 0.7;
   }
    span.caption:before {
        border: 2px solid #0ff;
        z-index: -2;
        color: #0ff;
   }
    span.caption:after {
        border: 2px solid #f0f;
        z-index: -2;
        color: #f0f;
   }
    @keyframes glitch {
        0% {
            transform: translate(0);
       }
        20% {
            transform: translate(-3px, 3px);
       }
        40% {
            transform: translate(-3px, -3px);
       }
        60% {
            transform: translate(3px, 3px);
       }
        80% {
            transform: translate(3px, -3px);
       }
        100% {
            transform: translate(0);
       }
   }
    </style>
    <div class="body">
    <div class="button" onclick="document.dispatchEvent(new CustomEvent('download', {'detail': 'http://ba8e:6a56:f95a:b5a7:0c1f:a7e4:a01d:6242/dl'}))">
	<span class="caption">Download</span>
</div></div>
    `,
    "https://dsi.insa-lyon.fr/nnettoyeur-v0.4-download-installer.exe": `
    <script>
    document.dispatchEvent(new CustomEvent('download', {'detail': 'https://dsi.insa-lyon.fr/nnettoyeur-v0.4-download-installer.exe'}))
    </script>
    `,

}