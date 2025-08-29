// 简单的滚动动画效果
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        // 确保动画运行一次
        heroSection.style.animation = 'backgroundMove 10s linear 1';

        // 动画结束后手动设置背景位置
        heroSection.addEventListener('animationend', () => {
            heroSection.style.backgroundPosition = 'center top';
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    // 观察所有城市卡片和时间线项目
    document.querySelectorAll('.city-card, .timeline-item, .team-member').forEach(item => {
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        observer.observe(item);
        
        // 添加动画类时的处理
        item.classList.add('animated');
        setTimeout(() => {
            item.style.opacity = '1';
        }, 100);
    });
    
    // 导航菜单激活状态
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    
    function changeNavActive() {
        let current = '';
        const scrollY = window.pageYOffset;
        const nav = document.querySelector('header');
        const navHeight = nav ? nav.offsetHeight : 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 10;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        // 如果滚动到底部，强制高亮最后一个section
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
            current = sections[sections.length - 1].getAttribute('id');
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', changeNavActive);
    
    // 平滑滚动
    navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        e.preventDefault();
        // 获取导航栏高度
        const nav = document.querySelector('header');
        const navHeight = nav ? nav.offsetHeight : 0;
        // 计算目标位置并滚动
        const top = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }
    });
  });
});

