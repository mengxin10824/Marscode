import { getNow } from "./Time";
import { generateUUID } from "./UUID";
/**
 * 消息模型 Dialog组件的每条对话的数据结构
 * 
 * @param id 消息唯一标识
 * @param content 消息内容
 * @param sender 发送者
 * @param receiver 接收者
 * @param sendTime 发送时间
 * 
 */

export enum MessageType {
    USER = 1,
    BOT = 2,
}

export class Message {
    // 唯一标识
    id: string;
    content: string;

    // 发送者
    sender: MessageType;

    // 发送时间
    sendTime: string;
    
    // 是否有附件
    attachMent: FileList | null = null;

    constructor(id: string = generateUUID(), content: string, sender: MessageType, sendTime: string = getNow(), attachMent: FileList | null = null) {
        this.id = id;
        this.content = content;
        this.sender = sender;
        this.sendTime = sendTime;
        this.attachMent = attachMent;
    }

    hasAttachments(): boolean {
        return this.attachMent !== null && this.attachMent.length > 0;
    }
}