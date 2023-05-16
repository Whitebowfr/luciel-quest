import NNettoyeur from "./Apps/Nnettoyeur/Software"
import InstallerWizard from "./Apps/Nnettoyeur/InstallerWizard"
import Decrypter from "./Apps/Decrypter"
import MailApp from "./Apps/Mail"
import Navigator from "./Apps/Navigator"
import PropertiesViewer from "./Apps/PropertiesViewer"
import ContextMenu from "./Apps/ContextMenu"
import ImageViewer from "./Apps/ImageViewer"
import FileExplorer from "./Apps/FileExplorer"
import TextEditor from "./Apps/TextEditor"
import Database from "./Apps/Database"
import Minigame from "./Apps/Minigame"

export function getCorrespondingApp(props, closeApp) {
    switch (props.appdata.appid) {
        case 12:
            return <Minigame {...props} />
        case 11:
            return <Database {...props} />
        case 10:
            return <InstallerWizard {...props} />
        case 9 :
            return <NNettoyeur {...props} />
        case 8 :
            return <Decrypter {...props} />
        case 7:
            return <MailApp {...props} />
        case 6:
            return <Navigator {...props} />
        case 5:
            return <PropertiesViewer {...props} closeApp={closeApp}/>
        case 4:
            return <ContextMenu {...props} />
        case 3:
            return <ImageViewer {...props} />
        case 2 :
            return <FileExplorer {...props} />
        case 1:
            return <TextEditor {...props} />
        default:
            return <></>
    }
}