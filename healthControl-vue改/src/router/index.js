import Report from '../view/Report.js'
import HealthFile from '../view/HealthFile.js'
import HealthNotes from '../view/HealthNotes.js'
import Manual from '../view/Manual.js'
import BloodOxygenReport from '../view/BloodOxygenReport.js'
import BloodPressureReport from '../view/BloodPressureReport.js'
import Index from '../view/Index.js'
import Drinking from '../view/Drinking.js'
import Smoking from '../view/Smoking.js'
import Labor from '../view/Labor.js'
import HealthHistory from '../view/HealthHistory.js'
import FamilyHistory from '../view/FamilyHistory.js'
import MedicalHistory from '../view/MedicalHistory.js'
import LivingHabit from '../view/LivingHabit.js'
import BasicFile from '../view/BasicFile.js'
import PhoneNumber from '../view/PhoneNumber.js'
import VerificationCode from '../view/VerificationCode.js'
import BingSucces from '../view/BingSucces.js'
import Error from '../view/Error.js'
import IntegrationReport from '../view/IntegrationReport.js'
import MedicationRecord from '../view/MedicationRecord.js'
import EatingHabits from '../view/EatingHabits.js'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'report',
      meta: {
        requireAuth: false,
        title: '检测报告',
      },
      component: Report
    },
    {
      path: '/healthFile',
      name: 'health-file',
      meta: {
        requireAuth: true,
        title: '健康档案',
      },
      component: HealthFile
    },
    {
      path: '/healthNotes',
      name: 'health-notes',
      meta: {
        requireAuth: true,
        title: '健康记录',
      },
      component: HealthNotes
    },
    {
      path: '/manual/:showId',
      name: 'manual',
      meta: {
        requireAuth: true,
        title: '手动输入',
      },
      component: Manual
    },
    {
      path: '/bloodOxygenReport',
      name: 'blood-oxygen-report',
      meta: {
        requireAuth: true,
        title: '血氧报告',
      },
      component: BloodOxygenReport
    },
    {
      path: '/bloodPressureReport',
      name: 'blood-pressure-report',
      meta: {
        requireAuth: true,
        title: '血压报告',
      },
      component: BloodPressureReport
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        requireAuth: true,
        title: '全程健康管理',
      },
      component: Index
    },

    {
      path: '/drinking',
      name: 'drinking',
      meta: {
        requireAuth: true,
        title: '饮酒情况',
      },
      component: Drinking
    },
    {
      path: '/smoking',
      name: 'smoking',
      meta: {
        requireAuth: true,
        title: '吸烟情况',
      },
      component: Smoking
    },
    {
      path: '/labor',
      name: 'labor',
      meta: {
        requireAuth: true,
        title: '体力劳动和运动',
      },
      component: Labor
    },
    {
      path: '/eatingHabits',
      name: 'eating-habits',
      meta: {
        requireAuth: true,
        title: '饮食习惯',
      },
      component: EatingHabits
    },
    {
      path: '/healthHistory',
      name: 'health-history',
      meta: {
        requireAuth: true,
        title: '健康史',
      },
      component: HealthHistory
    },
    {
      path: '/familyHistory',
      name: 'family-history',
      meta: {
        requireAuth: true,
        title: '家族史',
      },
      component: FamilyHistory
    },
    {
      path: '/medicalHistory',
      name: 'medical-history',
      meta: {
        requireAuth: true,
        title: '疾病史',
      },
      component: MedicalHistory
    },
    {
      path: '/livingHabit',
      name: 'living-habit',
      meta: {
        requireAuth: true,
        title: '生活习惯',
      },
      component: LivingHabit
    },
    {
      path: '/basicFile',
      name: 'basic-file',
      meta: {
        requireAuth: true,
        title: '基础档案',
      },
      component: BasicFile
    },
    {
      path: '/phoneNumber',
      name: 'phone-number',
      meta: {
        requireAuth: false,
        title: '手机认证',
      },
      component: PhoneNumber
    },
    {
      path: '/verificationCode',
      name: 'verification-code',
      meta: {
        requireAuth: false,
        title: '手机认证码',
      },
      component: VerificationCode
    },
    {
      path: '/bingSucces',
      name: 'bing-succes',
      meta: {
        requireAuth: false,
        title: '绑定成功',
      },
      component: BingSucces
    },
    {
      path: '/error',
      name: 'error',
      meta: {
        requireAuth: false,
        title: '错误信息',
      },
      component: Error
    },
    {
      path: '/integrationReport',
      name: 'integration-report',
      meta: {
        requireAuth: false,
        title: '整合报告',
      },
      component: IntegrationReport
    },
    {
      path: '/medicationRecord',
      name: 'medication-record',
      meta: {
        requireAuth: false,
        title: '体检记录',
      },
      component: MedicationRecord
    },
  ]
})

export default router
