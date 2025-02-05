import { convertYouTubeUrlToEmbed } from "../../../helper/helper";
import ModalBootstrap from "../modalBootstrap/ModalBootstrap";
import "./PlayYouTubeVideo.scss";
type PropsType = {
    url: string;
    show: boolean;
    onClose: () => void;
};

export default function PlayYouTubeVideo(props: PropsType) {
    const { url, show, onClose } = props;
    return (
        <ModalBootstrap size="md" show={show} handleClose={() => onClose()} class="play-youtube-video-modal">
            <div className="modal-body">
                <div style={{ width: "100%", aspectRatio: "16/9", position: "relative" }}>
                    <iframe
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                        }}
                        src={convertYouTubeUrlToEmbed(url)}
                        allowFullScreen
                        allow="autoplay"
                    />
                </div>
            </div>
        </ModalBootstrap>
    );
}
