export const mails = {
    "recoveryMail": {
        "subject": "Récupération de mot de passe",
        "content": `<h4>Vous avez demandé une récupération de mot de passe.</h4>
        <p>Si vous n'avez pas demandé de récupération de mot de passe, veuillez ignorer ce mail.</p>
        <span class="link" onClick="document.dispatchEvent(new CustomEvent('url_redirect', {'detail': 'https://www.passwordRecovery.com/abcdefghij'}))">Récupérer son mot de passe</span>
        <p>Si le lien ne fonctionne pas, copiez-collez l'adresse suivante dans votre navigateur : https://www.passwordRecovery.com/abcdefghij</p>`,
        "date": "",
        "unlockedConstant": "isRecoveryMailReceived"
    },
    "spam1": {
        "subject": "AGRANDISSEZ VOTRE GROBATON",
        "content" : `<h4>AGRANDISSEZ VOTRE GROBATON</h4>
        <h5>Vous avez un petit grobaton ?</h5>
        <p>Vous voulez un grobaton plus gros ?</p>
        <p>Alors cliquez sur ce lien : <span class="link onClick="document.dispatchEvent(new CustomEvent('url_redirect', {'detail': 'http://www.grobaton.xyz/'}))">https://www.grobaton.xyz</span></p>
        <p>Vous ne le regretterez pas !</p>`,
        "date": "Il y a 4 jours"
    },
    "DSI1": {
        "subject": "Nettoyage",
        "content": `<div style="white-space: pre-wrap">
Bonjour, 
  
Je vous envoie ce mail suite à votre ticket fait il y a une semaine, concernant un nettoyage d'un dossier de votre ordinateur personel.
  
Vous pouvez télécharger le logiciel de nettoyage NNettoyeur ©™® au lien suivant :
  
  <span class="link" onclick="document.dispatchEvent(new CustomEvent('url_redirect', {'detail': 'https://dsi.insa-lyon.fr/nnettoyeur-v0.4-download-installer.exe'}))" title="https://dsi.insa-lyon.fr/nnettoyeur-v0.4-download-installer.exe">https://dsi.insa-lyon.fr/nnettoyeur-v0.4-download-installer.exe</span>
(Si ce bouton ne fonctionne pas, veuillez copier-coller l'adresse dans votre navigateur)
  
Voici les instructions d'installation et d'utilisation :

  - Téléchargez l'installateur sur votre ordinateur.
  - Lancez-le et confirmez l'installation à l'aide de votre Clé Mathématique™ personnelle.
  - Une fois l'installation terminée, le logiciel sera installé sur votre ordinateur.
  - Pour nettoyer un dossier, faites clic droit sur ce dernier, puis cliquez sur "Nettoyer", et suivez les instructions à l'écran.
  
Veuillez nous excuser du délai, notre service était occupé à faire en sorte que les serveurs fonctionnent le moins bien possible pour les réservations de logements.
  
Bien cordialement,

<span style="font-style: italic">Cette adresse mail n'accepte pas de message, ne répondez pas à ce message.
Si vous avez une question, utilisez la FAQ du Helpdesk ou le site de la DSI.
Si vous ne trouvez pas la réponse, vous pouvez faire un ticket.</span>
--
<span style="color: rgb(182, 182, 181)">
<span style="font-size: 1.2rem">La Divinité des Systèmes Informatiques</span>
INSA Lyon
Campus LyonTech-La Doua
17 avenue Jean Capelle - Bâtiment Jules Verne
  69621 Villeurbanne cedex</span></div>`,
"date": "Il y a 4 jours"
    },
    "spam2": {
        "subject": "BESOIN AIDE RAPIDE",
        "content" : `<h4>Bonjoure chaire ami,</h4>
        <p>Je suit le prince du Niggeria et j'ai besoin de votre ède pour récupéré mon hairitage.</p>
        <p>Merci de m'envoyé argen.</p>
        <p>Adios bouffon.</p>`,
        "date": "Il y a 9 jours"
    }
}