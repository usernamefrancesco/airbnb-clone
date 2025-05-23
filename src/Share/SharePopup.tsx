import { type FC, useState } from "react";

const SharePopup: FC<Props> = ({
  shareData,
  onClose,
  onError
}) => {
  const [state, setState] = useState<ShareState>("pending");

  const copyClicked = async () => {
    try {
      await navigator.clipboard.writeText(shareData?.url || "");
      setState("success");
    } catch (err) {
      onError && onError(err);
      setState("error");
    }
  };

  const getButtonText = (state: ShareState) => {
    switch (state) {
      case "success":
        return "Link copied";
      case "pending":
      default:
        return "Copy link";
    }
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <h3>
                  {shareData.title}
                </h3>
                <button onClick={onClose}>
                  <span>Close Share</span>
                  <div aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g id="close">
                        <path
                          id="x"
                          d="M18.717 6.697l-1.414-1.414-5.303 5.303-5.303-5.303-1.414 1.414 5.303 5.303-5.303 5.303 1.414 1.414 5.303-5.303 5.303 5.303 1.414-1.414-5.303-5.303z"
                        />
                      </g>
                    </svg>
                  </div>
                </button>
              </div>
              <div>
                {state === "error" ? (
                  <div>
                      <p>
                        Unable to copy to clipboard, please manually copy the
                        url to share.
                      </p>
                  </div>
                ) : null}
                <input
                  value={shareData.url}
                  readOnly
                />
                <button
                  onClick={copyClicked}
                >
                  {getButtonText(state)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type ShareState = "pending" | "success" | "error";

interface Props {
  shareData: ShareData;
  onClose: () => void;
  onError?: (error?: unknown) => void;
}

export default SharePopup;
