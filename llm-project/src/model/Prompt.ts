/**
 * Prompt 
 * 
 * @param id 消息唯一标识
 * @param content 消息内容
 * @param sender 发送者
 * @param receiver 接收者
 * @param sendTime 发送时间
 * 
 */
export class Prompt {
    name: string;
    content: string;
    createdTime: string;

    constructor(name: string, content: string, createdTime: string) {
        this.name = name;
        this.content = content;
        this.createdTime = createdTime;
    }
}