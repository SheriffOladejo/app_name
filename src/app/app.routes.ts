import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'forgot',
    loadComponent: () => import('./forgot/forgot.page').then( m => m.ForgotPage)
  },
  {
    path: 'otp/:id/:type',
    loadComponent: () => import('./otp/otp.page').then( m => m.OtpPage)
  },
  {
    path: 'password',
    loadComponent: () => import('./password/password.page').then( m => m.PasswordPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'income/:type',
    loadComponent: () => import('./income/income.page').then( m => m.IncomePage)
  },
  {
    path: 'incomeadd',
    loadComponent: () => import('./incomeadd/incomeadd.page').then( m => m.IncomeaddPage)
  },
  {
    path: 'expense',
    loadComponent: () => import('./expense/expense.page').then( m => m.ExpensePage)
  },
  {
    path: 'expenseadd',
    loadComponent: () => import('./expenseadd/expenseadd.page').then( m => m.ExpenseaddPage)
  },
  {
    path: 'goal',
    loadComponent: () => import('./goal/goal.page').then( m => m.GoalPage)
  },
  {
    path: 'goaladd',
    loadComponent: () => import('./goaladd/goaladd.page').then( m => m.GoaladdPage)
  },
  {
    path: 'reminder',
    loadComponent: () => import('./reminder/reminder.page').then( m => m.ReminderPage)
  },
  {
    path: 'reminderadd',
    loadComponent: () => import('./reminderadd/reminderadd.page').then( m => m.ReminderaddPage)
  },
  {
    path: 'setting',
    loadComponent: () => import('./setting/setting.page').then( m => m.SettingPage)
  },
  {
    path: 'language',
    loadComponent: () => import('./language/language.page').then( m => m.LanguagePage)
  },
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'bank',
    loadComponent: () => import('./bank/bank.page').then( m => m.BankPage)
  },
  {
    path: 'bankadd',
    loadComponent: () => import('./bankadd/bankadd.page').then( m => m.BankaddPage)
  },
  {
    path: 'trans/:id',
    loadComponent: () => import('./trans/trans.page').then( m => m.TransPage)
  },
  {
    path: 'transfer/:id',
    loadComponent: () => import('./transfer/transfer.page').then( m => m.TransferPage)
  },
  {
    path: 'goaladd',
    loadComponent: () => import('./goaladd/goaladd.page').then( m => m.GoaladdPage)
  },
  {
    path: 'goalview',
    loadComponent: () => import('./goalview/goalview.page').then( m => m.GoalviewPage)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.page').then( m => m.ContactPage)
  },
  {
    path: 'report',
    loadComponent: () => import('./report/report.page').then( m => m.ReportPage)
  },
  {
    path: 'viewreport',
    loadComponent: () => import('./viewreport/viewreport.page').then( m => m.ViewreportPage)
  },
  {
    path: 'plan',
    loadComponent: () => import('./plan/plan.page').then( m => m.PlanPage)
  }
];
