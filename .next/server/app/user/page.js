(()=>{var e={};e.id=797,e.ids=[797],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},5315:e=>{"use strict";e.exports=require("path")},7360:e=>{"use strict";e.exports=require("url")},3832:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>n.a,__next_app__:()=>m,originalPathname:()=>u,pages:()=>c,routeModule:()=>p,tree:()=>d}),a(2637),a(4279),a(5866);var s=a(3191),r=a(8716),i=a(7922),n=a.n(i),l=a(5231),o={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>l[e]);a.d(t,o);let d=["",{children:["user",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,2637)),"/home/ayman-u/Desktop/myData/chemist-task/frontend/app/user/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(a.bind(a,4279)),"/home/ayman-u/Desktop/myData/chemist-task/frontend/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,5866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,7481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],c=["/home/ayman-u/Desktop/myData/chemist-task/frontend/app/user/page.tsx"],u="/user/page",m={require:a,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/user/page",pathname:"/user",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},4844:(e,t,a)=>{Promise.resolve().then(a.bind(a,7433))},2790:(e,t,a)=>{Promise.resolve().then(a.bind(a,3557))},7529:(e,t,a)=>{Promise.resolve().then(a.t.bind(a,2994,23)),Promise.resolve().then(a.t.bind(a,6114,23)),Promise.resolve().then(a.t.bind(a,9727,23)),Promise.resolve().then(a.t.bind(a,9671,23)),Promise.resolve().then(a.t.bind(a,1868,23)),Promise.resolve().then(a.t.bind(a,4759,23))},7433:(e,t,a)=>{"use strict";a.d(t,{AuthProvider:()=>o,a:()=>d});var s=a(326),r=a(7577),i=a(5047),n=a(6615);let l=(0,r.createContext)(void 0);function o({children:e}){let[t,a]=(0,r.useState)(null),[o,d]=(0,r.useState)(!0),c=(0,i.useRouter)();return s.jsx(l.Provider,{value:{user:t,isLoading:o,login:(e,t)=>{(0,n.setCookie)("access_token",e),(0,n.setCookie)("user_data",JSON.stringify(t)),a(t)},logout:()=>{(0,n.deleteCookie)("access_token"),(0,n.deleteCookie)("user_data"),(0,n.deleteCookie)("userRegistered"),a(null),c.push("/")}},children:e})}let d=()=>{let e=(0,r.useContext)(l);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e}},3557:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>d});var s=a(326),r=a(7577),i=a(5047),n=a(7433),l=a(6562);let o=e=>{if(e)return`http://localhost:4000/${e}`};function d(){(0,i.useRouter)();let{user:e,logout:t}=(0,n.a)(),[a,d]=(0,r.useState)(!0),[c,u]=(0,r.useState)(null),m=async e=>{let t=e.target.files?.[0];if(!t)return;if(t.size>5242880){alert("File size must be less than 5MB");return}if(!t.type.startsWith("image/")){alert("Please upload an image file");return}let a=new FileReader;a.onloadend=()=>{u(e=>e?{...e,profileImage:a.result}:null)},a.readAsDataURL(t);try{let e=new FormData;e.append("profileImage",t);let a=l.Z.get("access_token");if(!a||!c)return;let s=await fetch(`http://localhost:4000/api/api/users/${c.id}`,{method:"PATCH",headers:{Authorization:`Bearer ${a}`},body:e,credentials:"include"});if(!s.ok)throw Error("Failed to update profile image");let r=await s.json();r.success&&(l.Z.set("user_data",JSON.stringify(r.data),{secure:!0,sameSite:"strict",path:"/"}),u(r.data))}catch(t){console.error("Error updating profile image:",t),alert("Failed to update profile image. Please try again.");let e=l.Z.get("user_data");if(e)try{let t=JSON.parse(e);u(t)}catch(e){console.error("Error reverting profile:",e)}}};return a?s.jsx("div",{"data-testid":"loading-container",className:"min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100",children:s.jsx("main",{className:"flex-grow flex items-center justify-center",children:(0,s.jsxs)("div",{className:"text-center",children:[s.jsx("div",{"data-testid":"loading-spinner",role:"status","aria-label":"Loading",className:"w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"}),s.jsx("p",{"data-testid":"loading-text",className:"mt-4 text-gray-600",children:"Loading profile..."})]})})}):c?s.jsx("div",{className:"min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100",children:s.jsx("main",{className:"flex-grow container mx-auto px-4 py-8",children:s.jsx("div",{className:"max-w-3xl mx-auto",children:(0,s.jsxs)("div",{className:"bg-white rounded-2xl shadow-lg overflow-hidden",children:[s.jsx("div",{className:"bg-blue-600 px-6 py-8",children:(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsxs)("div",{className:"flex items-center space-x-4",children:[(0,s.jsxs)("label",{htmlFor:"profileImageUpload",className:"relative h-20 w-20 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all group",children:[c.profileImage?s.jsx("img",{src:o(c.profileImage)||"",alt:c.fullName?.charAt(0)??"test",className:"h-20 w-20 rounded-full object-cover"}):s.jsx("span",{className:"text-3xl text-white",children:c.fullName?.charAt(0)??"----"}),s.jsx("div",{className:"absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100  flex items-center justify-center transition-opacity",children:s.jsx("span",{className:"text-white text-xs",children:"Change Photo"})}),s.jsx("input",{id:"profileImageUpload",type:"file",accept:"image/*",className:"hidden",onChange:m})]}),(0,s.jsxs)("div",{children:[s.jsx("h1",{className:"text-2xl font-bold text-white",children:c.fullName}),s.jsx("p",{className:"text-blue-100",children:c.email})]})]}),s.jsx("button",{onClick:()=>{t()},className:"px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50","aria-label":"Logout",children:"Logout"})]})}),s.jsx("div",{className:"p-6 space-y-6",children:(0,s.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[s.jsx("label",{className:"text-sm font-medium text-gray-500",children:"Date of Birth"}),s.jsx("p",{className:"text-gray-900",children:new Date(c.dateOfBirth).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[s.jsx("label",{className:"text-sm font-medium text-gray-500",children:"Preferred Location"}),s.jsx("p",{className:"text-gray-900",children:c.preferredLocation.locationName})]}),(0,s.jsxs)("div",{className:"space-y-2 md:col-span-2",children:[s.jsx("label",{className:"text-sm font-medium text-gray-500",children:"Resume Summary"}),s.jsx("p",{className:"text-gray-900",children:c.resumeSummary})]}),(0,s.jsxs)("div",{className:"space-y-2 md:col-span-2",children:[s.jsx("label",{className:"text-sm font-medium text-gray-500",children:"Programming Skills"}),s.jsx("div",{className:"flex flex-wrap gap-2",children:c.programmingSkills?.map(e=>s.jsx("span",{className:"px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm",children:e.name},e.id))})]})]})})]})})})}):null}},4279:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>l,metadata:()=>n});var s=a(9510),r=a(8570);let i=(0,r.createProxy)(String.raw`/home/ayman-u/Desktop/myData/chemist-task/frontend/app/context/auth.context.tsx#AuthProvider`);(0,r.createProxy)(String.raw`/home/ayman-u/Desktop/myData/chemist-task/frontend/app/context/auth.context.tsx#useAuth`),a(7272);let n={title:"Login | Your App Name",description:"Secure login to access your account"};function l({children:e}){return s.jsx("html",{lang:"en",suppressHydrationWarning:!0,children:s.jsx("body",{suppressHydrationWarning:!0,className:"font-sans",children:s.jsx(i,{children:e})})})}},2637:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>s});let s=(0,a(8570).createProxy)(String.raw`/home/ayman-u/Desktop/myData/chemist-task/frontend/app/user/page.tsx#default`)},7481:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>r});var s=a(6621);let r=e=>[{type:"image/x-icon",sizes:"16x16",url:(0,s.fillMetadataSegment)(".",e.params,"favicon.ico")+""}]},7272:()=>{}};var t=require("../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),s=t.X(0,[948,981,739],()=>a(3832));module.exports=s})();