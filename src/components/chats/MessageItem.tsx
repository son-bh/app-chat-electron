import { API_BASE_URL } from "@/shared/constants";
import { extractLinkAndText } from "@/shared/utils/helpers";
import { TYPE_FILE_MESS } from "@/types";

interface MessageItemProps {
  type: TYPE_FILE_MESS;
  content: string;   // cho TEXT
  textColor: string;
  url?: string
}

export const MessageItem = ({ type, content, url, textColor }: MessageItemProps) => {

  if (type === "IMAGE") {
    return (
      <div className="">
        <div className="bg-gray-900">
          <img src={`${API_BASE_URL}/${url}`} alt="message-img" className="rounded-lg max-w-xs" />
        </div>
        <div className="mt-2">
          <p className={`text-sm ${textColor} break-words`}>
            {content}
          </p>
        </div>
      </div>
    )
  }

  if (type === "FILE") {
    return (
      <div className="overflow-x-auto whitespace-nowrap">
        <a href={`${API_BASE_URL}/${url}`} target="_blank" download className={`underline ${textColor}`}>
          {`${API_BASE_URL}/${url}`}
        </a>
      </div>
    )
  }

  if (type === "VIDEO") {
    return(
      <div className="">
        <div className="bg-gray-900">
          <video src={`${API_BASE_URL}/${url}`} controls className="rounded-lg max-w-xs" />
        </div>
        <div className="mt-2">
          <p className={`text-sm ${textColor} break-words`}>
            {content}
          </p>
        </div>
      </div>
    )
  }

  return (
    <p className={`text-sm ${textColor} break-words`}>
      {extractLinkAndText(content).link && (
        <a href={extractLinkAndText(content).link} target="_blank" download className={`underline ${textColor} break-all`}>
          {extractLinkAndText(content).link}
        </a>
      )}
      {" "}
      {extractLinkAndText(content).text && (
        <span className={`text-sm ${textColor}`}>{extractLinkAndText(content).text}</span>
      )}

    </p>
  )
};
