(this.webpackJsonpjasontracker=this.webpackJsonpjasontracker||[]).push([[0],{11:function(e,t,n){},35:function(e,t,n){},58:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n.n(s),o=n(28),i=n.n(o),l=(n(35),n(7)),r=n(8),c=n(10),d=n(9),h=(n(11),n(16)),u=n(2),b=n(5),p=n.n(b),j=n(0),g=function(e){var t=e.handleClose,n=e.show,s=e.submitHandler,a=n?"modal display-block":"modal display-none";return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("div",{className:a,children:Object(j.jsxs)("div",{className:"modal-main",children:[Object(j.jsx)("h2",{className:"black",children:"Add Expense: "}),Object(j.jsxs)("form",{onSubmit:s,children:[Object(j.jsxs)("label",{className:"black",children:["Expense Name:",Object(j.jsx)("input",{required:!0,type:"text",name:"expense",placeholder:"Eg. Food"})]}),Object(j.jsxs)("label",{className:"black",children:["Monthly Budget: $",Object(j.jsx)("input",{required:!0,type:"number",step:"0.01",pattern:"^\\d*(\\.\\d{0,2})?$",min:"0",name:"budget",placeholder:"0.00"})]}),Object(j.jsxs)("div",{className:"buttons-flex",children:[Object(j.jsx)("button",{type:"submit",onClick:t,className:"buttons-invariant",children:"Submit"}),Object(j.jsx)("button",{type:"button",onClick:t,className:"buttons-invariant",children:"Close"})]})]})]})})})},m=function(e){var t=e.myList,n=e.handleClose,s=e.handleChange,a=e.show,o=e.submitHandler,i=e.oldExpenseName,l=a?"modal display-block":"modal display-none";return Object(j.jsx)("div",{className:l,children:Object(j.jsxs)("div",{className:"modal-main",children:[Object(j.jsx)("h2",{className:"black",children:"Edit Expense: "}),Object(j.jsx)("div",{children:Object(j.jsxs)("form",{onSubmit:o,children:[Object(j.jsxs)("label",{className:"black",children:["Expense to be Changed:",Object(j.jsx)("select",{onChange:s,children:t.map((function(e){return Object(j.jsx)("option",{value:e.expense,children:e.expense})}))})]}),Object(j.jsxs)("label",{className:"black",children:["New Expense Name:",Object(j.jsx)("input",{required:!0,type:"text",name:" newExpense",placeholder:i})]}),Object(j.jsxs)("label",{className:"black",children:["New Monthly Budget: $",Object(j.jsx)("input",{required:!0,type:"number",step:"0.01",pattern:"^\\d*(\\.\\d{0,2})?$",min:"0",name:"newBudget",placeholder:"0.00"})]}),Object(j.jsxs)("div",{className:"buttons-flex",children:[Object(j.jsx)("button",{type:"submit",onClick:n,className:"buttons-invariant",children:"Submit"}),Object(j.jsx)("button",{type:"button",onClick:function(){n()},className:"buttons-invariant",children:"Close"})]})]})})]})})},x=function(e){var t=e.myList,n=e.handleClose,s=e.show,a=e.submitHandler,o=e.handleChange,i=s?"modal display-block":"modal display-none";return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("div",{className:i,children:Object(j.jsxs)("div",{className:"modal-main",children:[Object(j.jsx)("h2",{className:"black",children:"Add Transaction: "}),Object(j.jsxs)("form",{onSubmit:a,children:[Object(j.jsxs)("label",{className:"black",children:["Expense Category:",Object(j.jsx)("select",{onChange:o,children:t.map((function(e){return Object(j.jsx)("option",{value:e.expense,children:e.expense})}))})]}),Object(j.jsxs)("label",{className:"black",children:["Payee Info:",Object(j.jsx)("input",{required:!0,type:"text",name:"payee",placeholder:"Eg. Superstore"})]}),Object(j.jsxs)("label",{className:"black",children:["Spent: $",Object(j.jsx)("input",{required:!0,type:"number",step:"0.01",pattern:"^\\d*(\\.\\d{0,2})?$",min:"0",name:"spent",placeholder:"0.00"})]}),Object(j.jsxs)("div",{className:"buttons-flex",children:[Object(j.jsx)("button",{type:"submit",onClick:n,className:"buttons-invariant",children:"Submit"}),Object(j.jsx)("button",{type:"button",onClick:n,className:"buttons-invariant",children:"Close"})]})]})]})})})},O=n(4),v="https://Budgettracker-env.eba-vithmiis.us-east-2.elasticbeanstalk.com",f=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).submitUser=function(e){e.preventDefault();var t=!1;s.state.users.map((function(n){e.target[0].value===n.username&&(t=!0)})),!1===t?e.target[1].value===e.target[2].value?(p.a.post(v+"/user/addRow",{username:e.target[0].value,password:e.target[1].value}).then((function(t){console.log("status: ","user created"),console.log("Response:",t);var n={id:t.data,username:e.target[0].value,password:e.target[1].value};s.setState({users:[].concat(Object(h.a)(s.state.users),[n])},(function(){e.target[0].value="",e.target[1].value="",e.target[2].value=""}))})).catch((function(e){console.log(e)})),window.alert("User has been created!")):(e.target[1].value="",e.target[2].value="",window.alert("Passwords do not match.Try again.")):(window.alert("Username is taken. Try another."),e.target[0].value="",e.target[1].value="",e.target[2].value="")},s.state={users:[],showLogin:!1,showRegister:!0},s.submitUser=s.submitUser.bind(Object(u.a)(s)),s.renderLogin=s.renderLogin.bind(Object(u.a)(s)),s.changeLoginState=s.changeLoginState.bind(Object(u.a)(s)),s.renderRegister=s.renderRegister.bind(Object(u.a)(s)),s}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;p.a.get(v+"/user/allUsers").then((function(t){e.setState({users:t.data},(function(){console.log(this.state.users)}))}))}},{key:"changeLoginState",value:function(){this.setState({showLogin:!0,showRegister:!1})}},{key:"renderLogin",value:function(){console.log("signed OUt");window.location.pathname.split("/")[2];return localStorage.setItem("auth",!1),Object(O.b)().push("/"),Object(j.jsx)(j.Fragment,{children:Object(j.jsx)(w,{})})}},{key:"renderRegister",value:function(){var e=this;return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{className:"modal-main",children:[Object(j.jsx)("h1",{className:"mainTitle",id:"formText",children:"Register"}),Object(j.jsxs)("form",{onSubmit:this.submitUser,children:[Object(j.jsxs)("label",{className:"black",children:["Username:",Object(j.jsx)("div",{children:Object(j.jsx)("input",{id:"registerInput",required:!0,type:"text",name:"expense",placeholder:"Username_99"})})]}),Object(j.jsxs)("label",{className:"black",children:["Password:",Object(j.jsx)("input",{name:"password",placeholder:"Password123",required:!0,type:"password"})]}),Object(j.jsxs)("label",{className:"black",children:["Confirm Password:",Object(j.jsx)("input",{name:"confirmPassword",placeholder:"Password123",required:!0,type:"password"})]}),Object(j.jsxs)("div",{className:"buttons-flex",children:[Object(j.jsx)("button",{type:"submit",className:"buttons-invariant",children:"Submit"}),Object(j.jsx)("button",{type:"button",onClick:function(){e.changeLoginState()},className:"buttons-invariant",children:"to Login"})]})]})]})})}},{key:"render",value:function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{children:[this.state.showRegister&&this.renderRegister(),this.state.showLogin&&this.renderLogin()]})})}}]),n}(a.a.Component),w=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).submitUser=function(e){e.preventDefault();var t=!1,n="";if(s.state.users.map((function(s){e.target[0].value===s.username&&(n=s.password,t=!0)})),t){e.target[0].value;e.target[1].value===n?(localStorage.setItem("auth","authenticated"),s.setState({username:e.target[0].value,showHome:!0,showLogin:!1},(function(){console.log("Login Successful for: ",e.target[0].value)}))):(e.target[0].value="",e.target[1].value="",console.log("login failed"),window.alert("Username/Password is wrong. Try Again."))}else e.target[0].value="",e.target[1].value="",console.log("login failed"),window.alert("Username/Password is wrong. Try Again.")},s.state={users:[],username:"",showHome:!1,showLogin:!0,showRegister:!1},s.submitUser=s.submitUser.bind(Object(u.a)(s)),s.renderLogin=s.renderLogin.bind(Object(u.a)(s)),s.renderHome=s.renderHome.bind(Object(u.a)(s)),s.changeRegisterState=s.changeRegisterState.bind(Object(u.a)(s)),s.renderRegister=s.renderRegister.bind(Object(u.a)(s)),s}return Object(r.a)(n,[{key:"componentDidMount",value:function(){var e=this;p.a.get("https://Budgettracker-env.eba-vithmiis.us-east-2.elasticbeanstalk.com/user/allUsers").then((function(t){e.setState({users:t.data})})),localStorage.setItem("auth","notAuthenticated"),this.setState({showHome:!1,showLogin:!0,showRegister:!1})}},{key:"renderLogin",value:function(){var e=this;return Object(j.jsx)("div",{className:"App-header",children:Object(j.jsxs)("div",{className:"registerBox",children:[Object(j.jsx)("h1",{className:"mainTitle",id:"formText",children:"Budget Tracker\n\nLogin"}),Object(j.jsxs)("form",{onSubmit:this.submitUser,children:[Object(j.jsxs)("label",{className:"black",children:["Username:",Object(j.jsx)("div",{children:Object(j.jsx)("input",{id:"registerInput",required:!0,type:"text",name:"expense",placeholder:"Username_99"})})]}),Object(j.jsxs)("label",{className:"black",children:["Password:",Object(j.jsx)("input",{name:"password",placeholder:"Password123",required:!0,type:"password"})]}),Object(j.jsxs)("div",{className:"buttons-flex",children:[Object(j.jsx)("button",{type:"submit",className:"buttons-invariant",children:"Submit"}),Object(j.jsx)("button",{type:"button",onClick:function(){e.changeRegisterState()},className:"buttons-invariant",children:"Register"})]})]})]})})}},{key:"changeRegisterState",value:function(){this.setState({showLogin:!1,showRegister:!0,showHome:!1})}},{key:"renderRegister",value:function(){return Object(O.b)().push("/registerPage"),Object(j.jsx)(j.Fragment,{children:Object(j.jsx)(f,{})})}},{key:"renderHome",value:function(){return Object(O.b)().push("/home/"+this.state.username),Object(j.jsx)(j.Fragment,{children:Object(j.jsx)(C,{})})}},{key:"render",value:function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{children:[this.state.showLogin&&this.renderLogin(),this.state.showHome&&this.renderHome(),this.state.showRegister&&this.renderRegister()]})})}}]),n}(a.a.Component),D=n(60),S="https://Budgettracker-env.eba-vithmiis.us-east-2.elasticbeanstalk.com",y=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).state={selectedTransactions:[],allTransactions:[],allTransactionsForSelectedDate:[],expenses:[],listOfMonths:[{month:"January",monthNum:1},{month:"February",monthNum:2},{month:"March",monthNum:3},{month:"April",monthNum:4},{month:"May",monthNum:5},{month:"June",monthNum:6},{month:"July",monthNum:7},{month:"August",monthNum:8},{month:"September",monthNum:9},{month:"October",monthNum:10},{month:"November",monthNum:11},{month:"December",monthNum:12}],selectedMonth:-1,selectedYear:-1,today:new Date,showTransactions:!0,showHome:!1,showLogin:!1},s.handleSelectedMonthDropDownChange=s.handleSelectedMonthDropDownChange.bind(Object(u.a)(s)),s.handleSelectedYearDropDownChange=s.handleSelectedYearDropDownChange.bind(Object(u.a)(s)),s.handleSortByChange=s.handleSortByChange.bind(Object(u.a)(s)),s.renderTableData=s.renderTableData.bind(Object(u.a)(s)),s.renderTransactions=s.renderTransactions.bind(Object(u.a)(s)),s.renderHome=s.renderHome.bind(Object(u.a)(s)),s.renderLogin=s.renderLogin.bind(Object(u.a)(s)),s.changeLoginSetState=s.changeLoginSetState.bind(Object(u.a)(s)),s}return Object(r.a)(n,[{key:"handleSelectedMonthDropDownChange",value:function(e){var t=window.location.pathname.split("/")[2],n=0;"-1"!==e.target.value?(this.state.listOfMonths.map((function(t){t.monthNum===parseInt(e.target.value)&&(n=t.monthNum)})),this.setState({selectedMonth:n},(function(){var e=this;p.a.get(S+"/transaction/selectedTransactions/"+this.state.selectedMonth+"/"+this.state.selectedYear).then((function(n){console.log(n.data);var s=n.data.filter((function(e){if(e.userName===t)return e})),a=new Map(e.state.spentValsForAllExpenses);e.state.expenses.map((function(e){a.set(e.id,0)})),e.setState({selectedTransactions:s,spentValsForAllExpenses:s},(function(){var e=new Map(this.state.spentValsForAllExpenses);this.state.selectedTransactions.map((function(t){var n=e.get(t.expenseID);e.set(t.expenseID,n+t.spent)})),this.setState({spentValsForAllExpenses:e})}))}))}))):console.log("No month selected.")}},{key:"handleSelectedYearDropDownChange",value:function(e){var t=window.location.pathname.split("/")[2],n=0;"-1"!==e.target.value?(n=e.target.value,this.setState({selectedYear:n},(function(){var e=this;p.a.get(S+"/transaction/selectedTransactions/"+this.state.selectedMonth+"/"+this.state.selectedYear).then((function(n){console.log(n.data);var s=n.data.filter((function(e){if(e.userName===t)return e}));console.log("users transactions",s),e.setState({selectedTransactions:s,allTransactionsForSelectedDate:s},(function(){console.log(this.state.selectedTransactions)}))}))}))):console.log("No Year selected.")}},{key:"handleSortByChange",value:function(e){console.log("e.target.val",e.target.value);var t=-1;if(this.state.expenses.map((function(n){n.id===parseInt(e.target.value)&&(t=parseInt(n.id),console.log("myselectionVal: ",t))})),-1===t)this.setState({selectedTransactions:this.state.allTransactionsForSelectedDate});else{var n=this.state.allTransactionsForSelectedDate.filter((function(e){if(e.expenseID===t)return e}));this.setState({selectedTransactions:n})}}},{key:"submitHandlerDeleteTransaction",value:function(e){var t=this;console.log(e),p.a.delete(S+"/transaction/deleteRow/"+e).then((function(e){var n=e.data,s=t.state.allTransactions.filter((function(e){if(e.id!==n)return e})),a=t.state.allTransactionsForSelectedDate.filter((function(e){if(e.id!==n)return e})),o=t.state.selectedTransactions.filter((function(e){if(e.id!==n)return e}));t.setState({allTransaction:s,allTransactionsForSelectedDate:a,selectedTransactions:o}),console.log(e)})).catch((function(e){console.log(e)}))}},{key:"renderTableData",value:function(){var e=this,t=0;return Object(j.jsxs)(j.Fragment,{children:[this.state.selectedTransactions.reverse().map((function(n){var s;return e.state.expenses.map((function(e){e.id===n.expenseID&&(s=e.expense)})),t+=n.spent,Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:n.transactionDate}),Object(j.jsx)("td",{children:s}),Object(j.jsx)("td",{children:n.payee}),Object(j.jsxs)("td",{children:["$",n.spent.toFixed(2)]}),Object(j.jsx)("td",{children:Object(j.jsx)("button",{id:"trashCan",children:Object(j.jsx)(D.a,{color:"crimson",size:35,onClick:function(t){e.submitHandlerDeleteTransaction(n.id)}})})})]})})),Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{className:"bold",children:"Total Spent : "}),Object(j.jsx)("td",{className:"bold"}),Object(j.jsx)("td",{className:"bold"}),Object(j.jsxs)("td",{className:"bold",children:["$",t.toFixed(2)]}),Object(j.jsx)("td",{})]})]})}},{key:"renderLogin",value:function(){return Object(O.b)().push("/"),Object(j.jsx)(j.Fragment,{children:Object(j.jsx)(w,{})})}},{key:"changeLoginSetState",value:function(){this.setState({showLogin:!0,showHome:!1,showTransactions:!1})}},{key:"renderTransactions",value:function(){var e=this;window.location.pathname.split("/")[2];return"authenticated"===localStorage.getItem("auth")?Object(j.jsxs)("div",{className:"App-header",children:[Object(j.jsx)("h1",{className:"mainTitle",id:"trans-title",children:"My Transactions"}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{onClick:function(){e.setState({showHome:!0,showTransactions:!1})},id:"goBack-button",className:"button-25",children:"Go Back"})}),Object(j.jsxs)("div",{className:"dropdown-flex",id:"transDropDown",children:[Object(j.jsxs)("select",{value:this.state.selectedMonth,onChange:this.handleSelectedMonthDropDownChange,children:[Object(j.jsx)("option",{disabled:!0,value:"-1",children:"--Month--"}),this.state.listOfMonths.map((function(e){return Object(j.jsx)("option",{value:e.monthNum,children:e.month})}))]}),Object(j.jsxs)("select",{onChange:this.handleSelectedYearDropDownChange,children:[Object(j.jsx)("option",{disabled:!0,value:"-1",children:"--Year--"}),Object(j.jsx)("option",{value:this.state.today.getFullYear()-4,children:this.state.today.getFullYear()-4}),Object(j.jsx)("option",{value:this.state.today.getFullYear()-3,children:this.state.today.getFullYear()-3}),Object(j.jsx)("option",{value:this.state.today.getFullYear()-2,children:this.state.today.getFullYear()-2}),Object(j.jsx)("option",{value:this.state.today.getFullYear()-1,children:this.state.today.getFullYear()-1}),Object(j.jsx)("option",{selected:!0,value:this.state.today.getFullYear(),children:this.state.today.getFullYear()})]}),Object(j.jsxs)("select",{onChange:this.handleSortByChange,children:[Object(j.jsx)("option",{value:"All",children:"--Filter/All--"}),this.state.expenses.map((function(e){return Object(j.jsx)("option",{value:e.id,children:e.expense})}))]})]}),Object(j.jsxs)("table",{className:"expense-table",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Date"}),Object(j.jsx)("th",{children:"Category"}),Object(j.jsx)("th",{children:"Payee"}),Object(j.jsx)("th",{children:"Spent"}),Object(j.jsx)("th",{})]})}),Object(j.jsx)("tbody",{children:this.renderTableData()})]})]}):Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("div",{children:Object(j.jsx)("h2",{children:"You need to sign in to access this page."})}),Object(j.jsx)("div",{className:"buttons-flex",children:Object(j.jsx)("button",{id:"signIn-button",onClick:function(){return e.changeLoginSetState()},children:"Sign in"})})]})}},{key:"renderHome",value:function(){var e=window.location.pathname.split("/")[2];return Object(O.b)().push("/home/"+e),Object(j.jsx)(j.Fragment,{children:Object(j.jsx)(C,{})})}},{key:"componentDidMount",value:function(){var e=this,t=window.location.pathname.split("/")[2];p.a.get(S+"/transaction/allTransactions").then((function(t){var n=t.data;e.setState({allTransactions:n})})),p.a.get(S+"/expense/allExpenses").then((function(n){var s=n.data.filter((function(e){if(e.userName===t)return e}));e.setState({expenses:s},(function(){console.log("User Expense",this.state.expenses)}))}));var n=new Date;this.setState({selectedMonth:n.getMonth()+1,selectedYear:n.getFullYear()},(function(){var e=this;p.a.get(S+"/transaction/selectedTransactions/"+this.state.selectedMonth+"/"+this.state.selectedYear).then((function(n){console.log(n.data);var s=n.data.filter((function(e){if(e.userName===t)return e}));console.log("users transactions",s),e.setState({selectedTransactions:s,allTransactionsForSelectedDate:s},(function(){console.log(this.state.selectedTransactions)})),console.log("selectedMOnth",e.state.selectedMonth),console.log("selectedYear",e.state.selectedYear)}))}))}},{key:"render",value:function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{children:[this.state.showTransactions&&this.renderTransactions(),this.state.showHome&&this.renderHome(),this.state.showLogin&&this.renderLogin()]})})}}]),n}(a.a.Component),N=n(19),T=n.n(N),E="https://Budgettracker-env.eba-vithmiis.us-east-2.elasticbeanstalk.com",C=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(e){var s;return Object(l.a)(this,n),(s=t.call(this,e)).submitHandlerAddExpense=function(e){e.preventDefault();var t=window.location.pathname.split("/")[2];p.a.post(E+"/expense/addRow",{expense:e.target[0].value,budget:e.target[1].value,userName:t}).then((function(n){var a=n.data,o=e.target[0].value,i=parseFloat(e.target[1].value);console.log("Expense: "+e.target[0].value+"\nBudget: "+e.target[1].value+"\nAssigned ID: "+n.data);var l={id:a,expense:o,budget:i,spent:0,remaining:i,userName:t};s.setState({expenses:[].concat(Object(h.a)(s.state.expenses),[l])},(function(){var t=new Map(this.state.spentValsForAllExpenses);t.set(l.id,0),this.setState({spentValsForAllExpenses:t}),e.target[0].value=null,e.target[1].value=null}))})).catch((function(e){console.log(e)}))},s.submitHandlerAddTransaction=function(e){e.preventDefault();var t,n,a=window.location.pathname.split("/")[2],o=T()(new Date).format("YYYY-MM-DD");console.log("test",T()(o).format("YYYY-MM-DD")),s.state.expenses.filter((function(e){e.id===s.state.transactionDropDownSelection&&(n=e.expense,t=e.spent)})),p.a.post(E+"/transaction/addRow",{expenseID:s.state.transactionDropDownSelection,payee:e.target[1].value,spent:parseFloat(e.target[2].value),expenseValue:n,transactionDate:o,userName:a}).then((function(e){console.log(e)})).catch((function(e){console.log(e)}));var i={spent:t+parseFloat(e.target[2].value)};p.a.patch(E+"/expense/editSpent/"+s.state.transactionDropDownSelection,i);var l,r=new Map(s.state.spentValsForAllExpenses);s.state.expenses.map((function(e){console.log("dropdownselection",s.state.transactionDropDownSelection),e.id===s.state.transactionDropDownSelection&&(l=e.id,console.log("targetID",l))})),s.state.expenses.map((function(t){t.id===l&&(console.log("in here"),r.set(t.id,r.get(t.id)+parseFloat(e.target[2].value)),console.log(r.get(t.id)))}));var c=s.state.expenses.filter((function(n){return n.id===s.state.transactionDropDownSelection?(n.spent=t+parseFloat(e.target[2].value),n):n}));s.setState({expenses:c,spentValsForAllExpenses:r}),e.target[1].value=null,e.target[2].value=null},s.state={expenses:[],editDropDownSelection:0,transactionDropDownSelection:0,addExpenseToggle:!1,addTransactionToggle:!1,deleteExpenseToggle:!1,deleteConfirmVal:!1,editExpenseToggle:!1,selectedTransactions:[],listOfMonths:[{month:"January",monthNum:1},{month:"February",monthNum:2},{month:"March",monthNum:3},{month:"April",monthNum:4},{month:"May",monthNum:5},{month:"June",monthNum:6},{month:"July",monthNum:7},{month:"August",monthNum:8},{month:"September",monthNum:9},{month:"October",monthNum:10},{month:"November",monthNum:11},{month:"December",monthNum:12}],selectedMonth:-1,selectedYear:-1,today:new Date,spentValsForAllExpenses:new Map,showHome:!0,showTransactions:!1,showLogin:!1,userOnCurrentDate:!0,oldExpenseName:""},s.toggleAddExpenseModal=s.toggleAddExpenseModal.bind(Object(u.a)(s)),s.toggleAddTransactionModal=s.toggleAddTransactionModal.bind(Object(u.a)(s)),s.toggleDeleteExpenseModal=s.toggleDeleteExpenseModal.bind(Object(u.a)(s)),s.toggleEditExpenseModal=s.toggleEditExpenseModal.bind(Object(u.a)(s)),s.handleConfirmDelete=s.handleConfirmDelete.bind(Object(u.a)(s)),s.handleEditDropDownChange=s.handleEditDropDownChange.bind(Object(u.a)(s)),s.handleTransactionDropDownChange=s.handleTransactionDropDownChange.bind(Object(u.a)(s)),s.handleSelectedMonthDropDownChange=s.handleSelectedMonthDropDownChange.bind(Object(u.a)(s)),s.handleSelectedYearDropDownChange=s.handleSelectedYearDropDownChange.bind(Object(u.a)(s)),s.initEditDropDown=s.initEditDropDown.bind(Object(u.a)(s)),s.secondaryInitEdit=s.secondaryInitEdit.bind(Object(u.a)(s)),s.initTransactionDropDown=s.initTransactionDropDown.bind(Object(u.a)(s)),s.submitHandlerEditExpense=s.submitHandlerEditExpense.bind(Object(u.a)(s)),s.signOut=s.signOut.bind(Object(u.a)(s)),s.signOutsetState=s.signOutsetState.bind(Object(u.a)(s)),s}return Object(r.a)(n,[{key:"handleConfirmDelete",value:function(e){!0}},{key:"submitHandlerDeleteExpense",value:function(e){var t=this;console.log(e),p.a.delete(E+"/expense/deleteRow/"+e).then((function(e){var n=e.data,s=t.state.expenses.filter((function(e){if(e.id!==n)return e}));t.setState({expenses:s}),console.log(e)})).catch((function(e){console.log(e)})),p.a.delete(E+"/transaction/deleteExpenseTransactions/"+e).then((function(e){var n=e.data,s=t.state.selectedTransactions.filter((function(e){if(e.expenseID!==n)return e}));t.setState({selectedTransactions:s}),console.log(e)})).catch((function(e){console.log(e)}))}},{key:"submitHandlerEditExpense",value:function(e){var t=this;e.preventDefault();var n={expense:e.target[1].value,budget:parseFloat(e.target[2].value)};p.a.patch(E+"/expense/editRow/"+this.state.editDropDownSelection,n).then((function(s){console.log(s);var a=s.data,o=t.state.expenses.filter((function(t){return t.id!==a||(t.expense=e.target[1].value,t.budget=parseFloat(e.target[2].value)),t}));t.setState({expenses:o,oldExpenseName:n.expense}),e.target[1].value=null,e.target[2].value=null})).catch((function(e){console.log(e)}))}},{key:"initEditDropDown",value:function(){var e;if(0!==this.state.expenses.length){e=this.state.expenses[0].expense;var t=-1;this.state.expenses.map((function(e){(-1===t||e.id<t)&&(t=e.id)}));var n="";this.state.expenses.map((function(e){e.id===t&&(n=e.id)})),this.setState({editDropDownSelection:n},(function(){var t=this;this.state.expenses.map((function(s){s.id===n&&(t.setState({oldExpenseName:e}),console.log(n,t.state.oldExpenseName))}))}))}else this.setState({oldExpenseName:"No Expenses to Change"})}},{key:"secondaryInitEdit",value:function(){"No Expenses to Change"===this.state.oldExpenseName?0!==this.state.expenses.length&&this.setState({oldExpenseName:this.state.expenses[0].expense}):0===this.state.expenses.length&&this.setState({oldExpenseName:"No Expenses to Change"})}},{key:"handleEditDropDownChange",value:function(e){var t=0;this.state.expenses.map((function(n){n.expense===e.target.value&&(t=n.id)})),this.setState({editDropDownSelection:t},(function(){var e=this;this.state.expenses.map((function(n){n.id===t&&(e.setState({oldExpenseName:n.expense}),console.log(t,e.state.oldExpenseName))}))}))}},{key:"initTransactionDropDown",value:function(){var e=-1;this.state.expenses.map((function(t){(-1===e||t.id<e)&&(e=t.id)}));var t="";this.state.expenses.map((function(n){n.id===e&&(t=n.id)})),this.setState({transactionDropDownSelection:t})}},{key:"handleTransactionDropDownChange",value:function(e){var t=0;this.state.expenses.map((function(n){n.expense===e.target.value&&(t=n.id)})),this.setState({transactionDropDownSelection:t})}},{key:"handleSelectedMonthDropDownChange",value:function(e){var t=0;"-1"!==e.target.value?(this.state.listOfMonths.map((function(n){n.monthNum===parseInt(e.target.value)&&(t=n.monthNum)})),this.setState({selectedMonth:t},(function(){var e=this;parseInt(this.state.selectedYear)===this.state.today.getFullYear()&&this.state.selectedMonth===this.state.today.getMonth()+1?this.setState({userOnCurrentDate:!0}):this.setState({userOnCurrentDate:!1}),p.a.get(E+"/transaction/selectedTransactions/"+this.state.selectedMonth+"/"+this.state.selectedYear).then((function(t){console.log("newTransactionDate(MonthChange): ",t.data);var n=new Map(e.state.spentValsForAllExpenses);e.state.expenses.map((function(e){n.set(e.id,0)})),e.setState({selectedTransactions:t.data,spentValsForAllExpenses:n},(function(){var e=new Map(this.state.spentValsForAllExpenses);this.state.selectedTransactions.map((function(t){var n=e.get(t.expenseID);e.set(t.expenseID,n+t.spent)})),this.setState({spentValsForAllExpenses:e})}))}))}))):console.log("No month selected.")}},{key:"handleSelectedYearDropDownChange",value:function(e){var t=0;"-1"!==e.target.value?(t=e.target.value,this.setState({selectedYear:t},(function(){var e=this;parseInt(this.state.selectedYear)===this.state.today.getFullYear()&&this.state.selectedMonth===this.state.today.getMonth()+1?this.setState({userOnCurrentDate:!0}):this.setState({userOnCurrentDate:!1}),p.a.get(E+"/transaction/selectedTransactions/"+this.state.selectedMonth+"/"+this.state.selectedYear).then((function(t){console.log("newTransactionDate(YearChange): ",t.data);var n=new Map(e.state.spentValsForAllExpenses);e.state.expenses.map((function(e){n.set(e.id,0)})),e.setState({selectedTransactions:t.data,spentValsForAllExpenses:n},(function(){var e=new Map(this.state.spentValsForAllExpenses);this.state.selectedTransactions.map((function(t){var n=e.get(t.expenseID);e.set(t.expenseID,n+t.spent)})),this.setState({spentValsForAllExpenses:e})}))}))}))):console.log("No Year selected.")}},{key:"toggleAddExpenseModal",value:function(){this.setState({addExpenseToggle:!this.state.addExpenseToggle})}},{key:"toggleAddTransactionModal",value:function(){this.setState({addTransactionToggle:!this.state.addTransactionToggle})}},{key:"toggleDeleteExpenseModal",value:function(){this.setState({deleteExpenseToggle:!this.state.deleteExpenseToggle})}},{key:"toggleEditExpenseModal",value:function(){this.setState({editExpenseToggle:!this.state.editExpenseToggle})}},{key:"renderTableData",value:function(){var e=this,t=0,n=0;return Object(j.jsxs)(j.Fragment,{children:[this.state.expenses.map((function(s){var a=parseFloat(e.state.spentValsForAllExpenses.get(s.id));return t+=s.budget,n+=a,Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:s.expense}),Object(j.jsxs)("td",{children:["$",s.budget.toFixed(2)]}),Object(j.jsxs)("td",{children:["$",a.toFixed(2)]}),Object(j.jsxs)("td",{id:t-n>0?"remainingPos2":"remainingNeg2",children:["$",(s.budget-a).toFixed(2)]}),Object(j.jsx)("td",{children:Object(j.jsx)("button",{id:"trashCan",children:Object(j.jsx)(D.a,{color:"crimson",size:35,onClick:function(t){e.submitHandlerDeleteExpense(s.id),e.toggleDeleteExpenseModal()}})})})]})})),Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{className:"bold",children:"TOTAL : "}),Object(j.jsxs)("td",{className:"bold",children:["$",t.toFixed(2)]}),Object(j.jsxs)("td",{className:"bold",children:["$",n.toFixed(2)]}),Object(j.jsxs)("td",{className:"bold",id:t-n>0?"remainingPos":"remainingNeg",children:["$",(t-n).toFixed(2)]}),Object(j.jsx)("td",{})]})]})}},{key:"signOut",value:function(){console.log("signed OUt");window.location.pathname.split("/")[2];return localStorage.setItem("auth",!1),Object(O.b)().push("/"),Object(j.jsx)(j.Fragment,{children:Object(j.jsx)(w,{})})}},{key:"signOutsetState",value:function(){this.setState({showLogin:!0,showHome:!1,showTransactions:!1})}},{key:"renderHome",value:function(){var e=this,t=window.location.pathname.split("/")[2];return"authenticated"===localStorage.getItem("auth")?Object(j.jsxs)("div",{className:"App-header",children:[Object(j.jsx)("h1",{id:"myLogo",children:"TrackerX"}),Object(j.jsxs)("div",{id:"credentials",children:[Object(j.jsx)("p",{id:"signedInUser",children:"Signed In User: "+t}),Object(j.jsx)("div",{id:"signOut-button",children:Object(j.jsx)("button",{onClick:function(){e.signOutsetState()},children:"Sign Out"})})]}),Object(j.jsx)("div",{id:"navContainer",children:Object(j.jsxs)("div",{className:"navButtons",children:[Object(j.jsx)("button",{disabled:!this.state.userOnCurrentDate,className:"button-25",onClick:this.toggleAddExpenseModal,children:"Add Expense"}),Object(j.jsx)("button",{disabled:!this.state.userOnCurrentDate,className:"button-25",onClick:function(){e.toggleAddTransactionModal(),e.initTransactionDropDown()},children:"Add Transaction"}),Object(j.jsx)("button",{disabled:!this.state.userOnCurrentDate,className:"button-25",onClick:function(){e.toggleEditExpenseModal(),e.secondaryInitEdit(),console.log("list length",e.state.expenses.length)},children:"Edit Expense"}),Object(j.jsx)("button",{className:"button-25",id:"trans-button",onClick:function(){e.setState({showHome:!1,showTransactions:!0})},children:"Show Transactions"})]})}),Object(j.jsxs)("div",{id:"homeContent",children:[Object(j.jsx)(g,{handleClose:this.toggleAddExpenseModal,show:this.state.addExpenseToggle,submitHandler:this.submitHandlerAddExpense}),Object(j.jsx)(m,{myList:this.state.expenses,handleClose:this.toggleEditExpenseModal,handleChange:this.handleEditDropDownChange,show:this.state.editExpenseToggle,submitHandler:this.submitHandlerEditExpense,oldExpenseName:this.state.oldExpenseName}),Object(j.jsx)(x,{myList:this.state.expenses,handleClose:this.toggleAddTransactionModal,show:this.state.addTransactionToggle,submitHandler:this.submitHandlerAddTransaction,handleChange:this.handleTransactionDropDownChange}),Object(j.jsxs)("div",{className:"dropdown-flex",id:"dateDropDown",children:[Object(j.jsxs)("select",{id:"selectColor",value:this.state.selectedMonth,onChange:this.handleSelectedMonthDropDownChange,children:[Object(j.jsx)("option",{disabled:!0,value:"-1",children:"--Month--"}),this.state.listOfMonths.map((function(e){return Object(j.jsx)("option",{value:e.monthNum,children:e.month})}))]}),Object(j.jsxs)("select",{id:"selectColor",onChange:this.handleSelectedYearDropDownChange,children:[Object(j.jsx)("option",{disabled:!0,value:"-1",children:"--Year--"}),Object(j.jsx)("option",{value:this.state.today.getFullYear()-4,children:this.state.today.getFullYear()-4}),Object(j.jsx)("option",{value:this.state.today.getFullYear()-3,children:this.state.today.getFullYear()-3}),Object(j.jsx)("option",{value:this.state.today.getFullYear()-2,children:this.state.today.getFullYear()-2}),Object(j.jsx)("option",{value:this.state.today.getFullYear()-1,children:this.state.today.getFullYear()-1}),Object(j.jsx)("option",{selected:!0,value:this.state.today.getFullYear(),children:this.state.today.getFullYear()})]})]}),Object(j.jsxs)("table",{className:"expense-table",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Expense"}),Object(j.jsx)("th",{children:"Budget"}),Object(j.jsx)("th",{children:"Spent"}),Object(j.jsx)("th",{children:"Remaining"}),Object(j.jsx)("th",{})]})}),Object(j.jsx)("tbody",{children:this.renderTableData()})]})]})]}):Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("div",{children:Object(j.jsx)("h2",{children:"You need to sign in to access this page."})}),Object(j.jsx)("div",{className:"buttons-flex",children:Object(j.jsx)("button",{id:"signIn-button",onClick:function(){return e.signOutsetState()},children:"Sign in"})})]})}},{key:"renderTransactions",value:function(){var e=window.location.pathname.split("/")[2];return Object(O.b)().push("/transactionsTable/"+e),Object(j.jsx)(j.Fragment,{children:Object(j.jsx)(y,{})})}},{key:"componentDidMount",value:function(){var e=this;p.a.get(E+"/expense/allExpenses").then((function(t){console.log("auth",localStorage.getItem("auth"));var n=window.location.pathname.split("/")[2],s=t.data.filter((function(e){if(e.userName===n)return e}));e.setState({expenses:s});var a=new Date;e.setState({selectedMonth:a.getMonth()+1,selectedYear:a.getFullYear()},(function(){var e=this;p.a.get(E+"/transaction/selectedTransactions/"+this.state.selectedMonth+"/"+this.state.selectedYear).then((function(t){var s=t.data.filter((function(e){if(e.userName===n)return e}));e.setState({selectedTransactions:s},(function(){console.log(this.state.selectedTransactions)}));var a=new Map;e.state.expenses.map((function(e){a.set(e.id,0)})),e.setState({spentValsForAllExpenses:a}),e.state.selectedTransactions.map((function(t){var n=new Map(e.state.spentValsForAllExpenses),s=n.get(t.expenseID);n.set(t.expenseID,s+t.spent),e.setState({spentValsForAllExpenses:n})})),console.log("edit Selection",e.state.editDropDownSelection),e.initEditDropDown(),console.log("changed edit selection",e.state.editDropDownSelection)}))}))}))}},{key:"render",value:function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsxs)("div",{children:[this.state.showHome&&this.renderHome(),this.state.showTransactions&&this.renderTransactions(),this.state.showLogin&&this.signOut()]})})}}]),n}(a.a.Component),k=n(18),F=n(3),M=function(e){Object(c.a)(n,e);var t=Object(d.a)(n);function n(){var e;Object(l.a)(this,n);for(var s=arguments.length,a=new Array(s),o=0;o<s;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={},e}return Object(r.a)(n,[{key:"render",value:function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsx)("header",{children:Object(j.jsx)(k.a,{basename:"/BudgetTracker",children:Object(j.jsxs)(F.c,{children:[Object(j.jsx)(F.a,{exact:!0,path:"/home/:username",element:Object(j.jsx)(C,{auth:!1})}),Object(j.jsx)(F.a,{exact:!0,path:"/transactionsTable/:username",element:Object(j.jsx)(y,{})}),Object(j.jsx)(F.a,{exact:!0,path:"/registerPage",element:Object(j.jsx)(f,{})}),Object(j.jsx)(F.a,{exact:!0,path:"/",element:Object(j.jsx)(w,{})})]})})})})}}]),n}(a.a.Component),Y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,61)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,o=t.getLCP,i=t.getTTFB;n(e),s(e),a(e),o(e),i(e)}))};i.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(M,{})}),document.getElementById("root")),Y()}},[[58,1,2]]]);
//# sourceMappingURL=main.3bf1e6ed.chunk.js.map