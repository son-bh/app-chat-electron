import { PinIcon } from "@/icons";
import { useQueryGetPinMessages } from "@/services/message";
import { IMessage } from "@/types";
import { format } from "date-fns";
import { MessageItem } from "./MessageItem";

function groupMessagesByDate(messages: IMessage[]) {
  return messages.reduce<Record<string, IMessage[]>>((groups, message) => {
    const dateKey = format(new Date(message.createdAt), "yyyy-MM-dd");
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(message);
    return groups;
  }, {});
}

export const PinMessages = ({ conversationId }: { conversationId: string }) => {
  const { data } = useQueryGetPinMessages({ conversationId });
  const grouped = groupMessagesByDate(data?.data || []);

  return (
    <div className="text-black">
      <div className="space-y-4 px-4 py-4">
        {Object.entries(grouped).map(([date, msgs]) => (
          <div key={date}>
            <div
              className="py-4 text-[#8774E1] text-lg font-semibold"
              style={{
                boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
              }}
            >
              {format(new Date(date), "dd/MM/yyyy")}
            </div>
            <div className="mt-4">
              {msgs.map((m) => (
                <div
                  key={m._id}
                  className="py-4 border-b border-[#8774E1] flex items-center break-words"
                  style={{
                    boxShadow: "rgba(33, 35, 38, 0.1) 0px 16px 10px -10px",
                  }}
                >
                  <PinIcon className="size-4 rotate-[-45deg] mr-2" />{" "}
                  <MessageItem
                    content={m.text}
                    type={m.type}
                    textColor="text-gray-900"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
