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
                path:'/dashboard/customers'
            },
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