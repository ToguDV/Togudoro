export class Notify {
    constructor(title, body, favicon) {
        this.title = title;
        this.body = body;
        this.favicon = favicon;
    }

    create() {
        let body = this.body;
        let favicon = this.favicon;

        new Notification(this.title, {body , favicon});
    }

    validate(){
        if('Notification' in window === true){
            Notification.requestPermission();
            return true;
        }
        
    }

    show() {
        if(this.validate()) {
            this.create();
        }
    }
}