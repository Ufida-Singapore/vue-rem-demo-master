import App from '../app'

export default [{
	path: '/',
	component: App,
	children: [{
		path: '/',
		component: resolve => require(['../view/index'], resolve)
	},
	{
		name: 'mainPage',
		path: '/mainPage',
        component: resolve => require(['../view/mainPage'], resolve)
	},
	{
        name: 'reportPage',
        path: '/reportPage',
        component: resolve => require(['../view/reportPage'], resolve)
	},
	{
		name: 'conditionPage',
		path: '/conditionPage',
		component: resolve => require(['../view/conditionPage'], resolve)
	},
	{
        name: 'selectTable',
        path: '/selectTable',
        component: resolve => require(['../view/selectTable'], resolve)
    },
	{
		name: 'barChartPage',
		path: '/barChartPage',
		component: resolve => require(['../view/barChartPage'], resolve)
    },
	{
	    name: 'configurePage',
		path: '/configurePage',
        component: resolve => require(['../view/configurePage'], resolve)
	}]
}]