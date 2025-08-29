document.addEventListener('DOMContentLoaded', function() {
    // 全局图表配置（统一风格）
    Chart.defaults.font.family = "'Microsoft YaHei', 'SimHei', sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.color = '#2c3e50';
    Chart.defaults.borderColor = 'rgba(174, 214, 241, 0.5)';

    // 1. 调研对象身份分布（整合线上线下：线上22份+线下264份）
    const identityCtx = document.getElementById('identityChart').getContext('2d');
    new Chart(identityCtx, {
        type: 'doughnut',
        data: {
            labels: ['运河周边居民', '游客', '运河周边商户', '其他'],
            datasets: [{
                label: '身份占比',
                data: [48.2, 33.6, 9.8, 8.4], // 整合后数据：居民(130人)、游客(96人)、商户(28人)、其他(24人)
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(243, 156, 18, 0.8)',
                    'rgba(155, 89, 182, 0.8)'
                ],
                borderWidth: 2,
                borderColor: '#fff',
                hoverOffset: 12,
                shadow: { blur: 6, offsetX: 1, offsetY: 1, color: 'rgba(0,0,0,0.08)' }
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 1, // 1:1正方形，避免椭圆
            cutout: '60%',
            plugins: {
                legend: { 
                    position: 'bottom', 
                    labels: { padding: 12, usePointStyle: true, pointStyle: 'circle', font: { size: 11 } } 
                },
                tooltip: {
                    backgroundColor: 'rgba(44,62,80,0.9)',
                    padding: 10,
                    cornerRadius: 6,
                    callbacks: { 
                        label: (ctx) => `${ctx.label}：${ctx.raw}%（${Math.round(ctx.raw*286/100)}人）` 
                    }
                }
            }
        }
    });

    // 2. 运河历史认知程度（地域对比：线上+淮安+扬州+常州）
    const awarenessCtx = document.getElementById('awarenessChart').getContext('2d');
    new Chart(awarenessCtx, {
        type: 'bar',
        data: {
            labels: ['非常了解', '较了解', '一般', '不太了解', '不了解'],
            datasets: [
                {
                    label: '线上（22人）',
                    data: [0, 18.2, 45.5, 27.3, 9.0],
                    backgroundColor: 'rgba(155, 89, 182, 0.8)',
                    borderRadius: 4
                },
                {
                    label: '淮安（82人）',
                    data: [4.9, 41.5, 36.6, 12.2, 4.8],
                    backgroundColor: 'rgba(52, 152, 219, 0.8)',
                    borderRadius: 4
                },
                {
                    label: '扬州（98人）',
                    data: [3.1, 36.7, 40.8, 15.3, 4.1],
                    backgroundColor: 'rgba(46, 204, 113, 0.8)',
                    borderRadius: 4
                },
                {
                    label: '常州（86人）',
                    data: [2.3, 31.4, 43.0, 18.6, 4.7],
                    backgroundColor: 'rgba(243, 156, 18, 0.8)',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 0.7, // 纵向比例优化，避免扁平
            indexAxis: 'y',
            plugins: {
                legend: { 
                    position: 'bottom',
                    labels: { padding: 10, font: { size: 11 } }
                },
                tooltip: {
                    backgroundColor: 'rgba(44,62,80,0.9)',
                    padding: 10,
                    cornerRadius: 6,
                    callbacks: { 
                        label: (ctx) => `${ctx.dataset.label}：${ctx.raw}%（${Math.round(ctx.raw*ctx.dataset.label.match(/\d+/)[0]/100)}人）` 
                    }
                }
            },
            scales: {
                x: { 
                    max: 100, 
                    ticks: { callback: (v) => v + '%', font: { size: 11 } },
                    grid: { color: 'rgba(174,214,241,0.3)' }
                },
                y: { 
                    ticks: { font: { size: 11 } },
                    grid: { display: false }
                }
            }
        }
    });

    // 3. 运河古建核心价值认知（整合数据）
    const valueCtx = document.getElementById('valueChart').getContext('2d');
    new Chart(valueCtx, {
        type: 'bar',
        data: {
            labels: ['历史见证', '水利工程', '民俗文化', '旅游休闲', '生态环境', '建筑科技', '社区认同'],
            datasets: [{
                label: '认同占比（%）',
                data: [98.6, 82.1, 64.3, 58.7, 49.3, 38.5, 31.1], // 整合后数据：历史见证(282人)、水利工程(235人)等
                backgroundColor: 'rgba(52, 152, 219, 0.8)',
                borderRadius: 4,
                barPercentage: 0.7,
                hoverBackgroundColor: 'rgba(52, 152, 219, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 0.7,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(44,62,80,0.9)',
                    padding: 10,
                    cornerRadius: 6,
                    callbacks: { 
                        label: (ctx) => `${ctx.label}：${ctx.raw}%（${Math.round(ctx.raw*286/100)}人）` 
                    }
                }
            },
            scales: {
                x: { 
                    max: 100, 
                    ticks: { callback: (v) => v + '%', font: { size: 11 } },
                    grid: { color: 'rgba(174,214,241,0.3)' }
                },
                y: { 
                    ticks: { font: { size: 11 } },
                    grid: { display: false }
                }
            }
        }
    });

    // 4. 古建保护现存主要问题（整合数据）
    const problemCtx = document.getElementById('problemChart').getContext('2d');
    new Chart(problemCtx, {
        type: 'bar',
        data: {
            labels: ['过度商业化', '现代设施冲突', '维护管理不足', '文化展示薄弱', '公众参与度低', '建筑本体破损', '古水利功能缺失'],
            datasets: [{
                label: '关注占比（%）',
                data: [58.4, 55.2, 46.8, 43.7, 35.3, 31.1, 27.6], // 整合后数据：过度商业化(167人)、设施冲突(158人)等
                backgroundColor: 'rgba(231, 76, 60, 0.8)',
                borderRadius: 4,
                barPercentage: 0.7,
                hoverBackgroundColor: 'rgba(231, 76, 60, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 0.7,
            indexAxis: 'y',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(44,62,80,0.9)',
                    padding: 10,
                    cornerRadius: 6,
                    callbacks: { 
                        label: (ctx) => `${ctx.label}：${ctx.raw}%（${Math.round(ctx.raw*286/100)}人）` 
                    }
                }
            },
            scales: {
                x: { 
                    max: 100, 
                    ticks: { callback: (v) => v + '%', font: { size: 11 } },
                    grid: { color: 'rgba(174,214,241,0.3)' }
                },
                y: { 
                    ticks: { font: { size: 11 } },
                    grid: { display: false }
                }
            }
        }
    });

    // 5. 古水利设施保护建议（地域差异）
    const waterSuggestCtx = document.getElementById('waterSuggestChart').getContext('2d');
    new Chart(waterSuggestCtx, {
        type: 'bar',
        data: {
            labels: ['优先本体修缮', '恢复原始功能', '改造文化展示基地', '结合现代技术', '设计景观节点'],
            datasets: [
                {
                    label: '淮安（82人）',
                    data: [62.2, 58.5, 46.3, 39.0, 32.9],
                    backgroundColor: 'rgba(52, 152, 219, 0.8)',
                    borderRadius: 4
                },
                {
                    label: '扬州（98人）',
                    data: [56.1, 38.8, 68.4, 72.4, 48.0],
                    backgroundColor: 'rgba(46, 204, 113, 0.8)',
                    borderRadius: 4
                },
                {
                    label: '常州（86人）',
                    data: [59.3, 41.9, 62.8, 55.8, 51.2],
                    backgroundColor: 'rgba(243, 156, 18, 0.8)',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 0.7,
            indexAxis: 'y',
            plugins: {
                legend: { 
                    position: 'bottom',
                    labels: { padding: 10, font: { size: 11 } }
                },
                tooltip: {
                    backgroundColor: 'rgba(44,62,80,0.9)',
                    padding: 10,
                    cornerRadius: 6,
                    callbacks: { 
                        label: (ctx) => `${ctx.dataset.label}：${ctx.raw}%（${Math.round(ctx.raw*ctx.dataset.label.match(/\d+/)[0]/100)}人）` 
                    }
                }
            },
            scales: {
                x: { 
                    max: 100, 
                    ticks: { callback: (v) => v + '%', font: { size: 11 } },
                    grid: { color: 'rgba(174,214,241,0.3)' }
                },
                y: { 
                    ticks: { font: { size: 11 } },
                    grid: { display: false }
                }
            }
        }
    });

    // 6. 了解运河文化的渠道（整合数据）
    const channelCtx = document.getElementById('channelChart').getContext('2d');
    new Chart(channelCtx, {
        type: 'bar',
        data: {
            labels: ['互联网', '学校/单位活动', '本地生活/工作', '书籍/纪录片', '景区展板/博物馆', '亲友介绍', '其他'],
            datasets: [
                {
                    label: '线上（22人）',
                    data: [77.3, 68.2, 27.3, 54.5, 50.0, 22.7, 9.1],
                    backgroundColor: 'rgba(155, 89, 182, 0.8)',
                    borderRadius: 4
                },
                {
                    label: '线下（264人）',
                    data: [48.5, 52.3, 68.2, 36.7, 62.1, 31.8, 7.6],
                    backgroundColor: 'rgba(52, 152, 219, 0.8)',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 0.7,
            indexAxis: 'y',
            plugins: {
                legend: { 
                    position: 'bottom',
                    labels: { padding: 10, font: { size: 11 } }
                },
                tooltip: {
                    backgroundColor: 'rgba(44,62,80,0.9)',
                    padding: 10,
                    cornerRadius: 6,
                    callbacks: { 
                        label: (ctx) => `${ctx.dataset.label}：${ctx.raw}%（${Math.round(ctx.raw*ctx.dataset.label.match(/\d+/)[0]/100)}人）` 
                    }
                }
            },
            scales: {
                x: { 
                    max: 100, 
                    ticks: { callback: (v) => v + '%', font: { size: 11 } },
                    grid: { color: 'rgba(174,214,241,0.3)' }
                },
                y: { 
                    ticks: { font: { size: 11 } },
                    grid: { display: false }
                }
            }
        }
    });
});