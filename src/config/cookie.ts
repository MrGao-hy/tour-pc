const cookie = {
    set: (key: string, value: any) => {
        const date=new Date();
        // 代表十四天后自动过期
        const expiresHours= 14;
        date.setTime(date.getTime()+expiresHours*24*3600*1000);
        document.cookie=key + "=" + value +";expires="+date.toUTCString()+";path=/";
    },
    get: (key: string) => {
        const getCookie = document.cookie.replace(/ /g,"");
        const arrCookie = getCookie.split(";")
        let tips;
        for(let i=0;i<arrCookie.length;i++){
            const arr=arrCookie[i].split("=");
            if(key === arr[0]){
                tips=arr[1];
                break;
            }
        }
        return tips;
    },
    remove: (key: string) => {
        document.cookie= key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}
export default cookie;