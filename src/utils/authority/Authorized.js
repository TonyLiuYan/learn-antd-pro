import RenderAuthorized from 'ant-design-pro/lib/Authorized';

let Authorized = RenderAuthorized(['admin']);//这里可以动态获取权限信息

export default Authorized;//进行导出，其实就是一个组件，在之前被赋予的准入权限