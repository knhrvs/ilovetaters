import { InboxModel } from "features/profile/core/domain/inbox.model";
import { GrAttachment, GrDocumentText } from "react-icons/gr";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

interface InboxViewerModalProps {
  open: boolean;
  inbox: InboxModel | null;
  onClose: () => void;
}

export function InboxViewerModal(props: InboxViewerModalProps) {
  if (props.open) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-start justify-center overflow-auto bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="bg-paper px-4 pt-[30px] pb-3 round w-[90%] lg:w-[500px] mt-10 relative rounded-xl">
        <button
          className="absolute text-2xl text-secondary top-2 right-4"
          onClick={() => {
            document.body.classList.remove("overflow-hidden");
            props.onClose();
          }}
        >
          <IoMdClose />
        </button>

        <div className="mt-2 leading-tight">
          <div className="space-y-3 text-secondary">
            <h1 className="text-lg font-bold">{props.inbox?.title}</h1>

            <p className="text-sm whitespace-pre-line">{props.inbox?.body}</p>

            <p className="text-sm">{props.inbox?.closing}</p>

            <p className="text-sm">{props.inbox?.closing_salutation}</p>

            <div>
              <p className="font-bold">{props.inbox?.message_from}</p>
              <p className="text-xs font-bold">{props.inbox?.contact_number}</p>
              <p className="text-xs font-bold">{props.inbox?.email}</p>
            </div>
          </div>

          {props.inbox?.image_url ? (
            <div className="relative mt-4">
              <img
                src={props.inbox.image_url}
                alt={props.inbox?.image_title ?? ""}
              />
              <span className="absolute bottom-[10px] z-10 text-2xl text-black font-bold left-[10px]">
                {props.inbox?.image_title}
              </span>
            </div>
          ) : null}

          {props.inbox?.internal_link_url ? (
            <div className="flex mt-4">
              <Link
                to={props.inbox.internal_link_url}
                className="flex flex-col items-center justify-center px-4 pt-4 pb-1 border-4 shadow-xl border-secondary"
              >
                <GrDocumentText className="text-6xl" />
                <div className="flex items-center justify-center mt-2 space-x-1">
                  <GrAttachment className="text-lg font-semibold" />
                  <span className="text-lg font-semibold">
                    {props.inbox?.internal_link_title}
                  </span>
                </div>
              </Link>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-end mt-4 space-x-2">
          <button
            onClick={props.onClose}
            className="py-1 w-[100px] font-bold bg-secondary rounded-full text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
