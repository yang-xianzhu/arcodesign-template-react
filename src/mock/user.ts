import Mock from 'mockjs';
import { isSSR } from '@/utils/is';
import setupMock from '@/utils/setupMock';
import { generatePermission } from '@/routes';

if (!isSSR) {
  Mock.XHR.prototype.withCredentials = true;

  setupMock({
    setup: () => {
      // 用户信息
      const userRole = window.localStorage.getItem('userRole') || 'admin';
      Mock.mock(new RegExp('/api/user/userInfo'), () => {
        return Mock.mock({
          name: '杨先铸',
          avatar: 'https://avatars.githubusercontent.com/u/92789120?v=4',
          email: 'wangliqun@email.com',
          job: 'Frontend',
          jobName: '前端开发工程师',
          organization: 'Frontend',
          organizationName: '前端',
          location: 'guangzhou',
          locationName: '广州',
          introduction: '杨某人努力学习前端',
          personalWebsite: 'https://www.arco.design',
          verified: true,
          phoneNumber: /177[*]{6}[0-9]{2}/,
          accountId: /[a-z]{4}[-][0-9]{8}/,
          registrationTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
          permissions: generatePermission(userRole),
        });
      });

      // 登录
      Mock.mock(new RegExp('/api/user/login'), (params) => {
        const { userName, password } = JSON.parse(params.body);
        if (!userName) {
          return {
            status: 'error',
            msg: '用户名不能为空',
          };
        }
        if (!password) {
          return {
            status: 'error',
            msg: '密码不能为空',
          };
        }
        if (userName === 'admin' && password === 'admin') {
          return {
            status: 'ok',
          };
        }
        return {
          status: 'error',
          msg: '账号或者密码错误',
        };
      });
    },
  });
}
