export const Routes = {
    landingPage:{
        path:'/',
    },
    dashboard:{
        title:'Dashboard',
        path:'/dashboard',
        pages:{ 
            stock:{
                title:'Stock',
                path:'/dashboard/stock'
            },
            users:{
                title:'Users',
                path:'/dashboard/users'
            },
            summary:{
                title:'Summary',
                path:'/dashboard'
            },
            customer:{
                title:'Customers',
                path:'/dashboard/customers',
            },
            transactionHistory:{
                title:'Sales & payment history',
                path:'/dashboard/customers/history',
            }

        }
    },
    POS:{
        path:"pos",
        creditSales:{
            path:'/pos/credit-sales'
        },
        cashSales:{
            path:'/pos/cash-sales'
        }
    }
}

export const isSelectedRoute = (expected:string[],currentRoute:string) =>{
    if(expected?.length === 0) return false;

    let isPart:boolean[] = [];
    expected.forEach((val)=>{
        if(val?.toLowerCase().trim() === currentRoute?.toLowerCase().trim()){
            isPart.push(true)
        }
    })

    return isPart.includes(true);
}