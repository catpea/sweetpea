export default function interpolate(t = "", c = {}, r=new RegExp('\\${([^}]+)}', 'g')){return t.replace(r,(m,p)=>p.split('.').reduce((a,f)=>a?a[f]:undefined,c)??'');}
