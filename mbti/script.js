// MBTI测试应用
class MBTITest {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.dimensionScores = {
            'E-I': { E: 0, I: 0 },
            'S-N': { S: 0, N: 0 },
            'T-F': { T: 0, F: 0 },
            'J-P': { J: 0, P: 0 }
        };
        
        this.init();
    }

    async init() {
        this.loadQuestions();
        this.bindEvents();
        this.updateTotalQuestions();
    }

    loadQuestions() {
        // 直接嵌入JSON数据，避免fetch请求
        const data = {
            "E-I维度": [
                {
                    "question_id": 1,
                    "text": "当你要外出一整天，你会...",
                    "options": {
                        "A": "计划你要做什么和在什么时候做",
                        "B": "说去就去"
                    }
                },
                {
                    "question_id": 2,
                    "text": "你认为自己是一个...",
                    "options": {
                        "A": "较为随兴所至的人",
                        "B": "较为有条理的人"
                    }
                },
                {
                    "question_id": 7,
                    "text": "处理许多事情上，你会喜欢...",
                    "options": {
                        "A": "凭兴所至行事",
                        "B": "按照计划行事"
                    }
                },
                {
                    "question_id": 10,
                    "text": "当你有一份特别的任务，你会喜欢...",
                    "options": {
                        "A": "开始前小心组织计划",
                        "B": "边做边找须做什么"
                    }
                },
                {
                    "question_id": 11,
                    "text": "在大多数情况下，你会选择...",
                    "options": {
                        "A": "顺其自然",
                        "B": "按程序表做事"
                    }
                },
                {
                    "question_id": 18,
                    "text": "你喜欢花很多的时间...",
                    "options": {
                        "A": "一个人独处",
                        "B": "合别人在一起"
                    }
                },
                {
                    "question_id": 20,
                    "text": "你比较喜欢...",
                    "options": {
                        "A": "很早便把约会等安排妥当",
                        "B": "无拘无束看当时有趣的事"
                    }
                },
                {
                    "question_id": 21,
                    "text": "计划旅程时，你较喜欢...",
                    "options": {
                        "A": "跟当天感觉行事",
                        "B": "事先知道大部分安排"
                    }
                },
                {
                    "question_id": 25,
                    "text": "日常工作中，你会...",
                    "options": {
                        "A": "喜欢处理突发任务",
                        "B": "预先计划避免压力"
                    }
                },
                {
                    "question_id": 33,
                    "text": "你通常...",
                    "options": {
                        "A": "容易让人了解",
                        "B": "难于让人了解"
                    }
                },
                {
                    "question_id": 41,
                    "text": "你认为按照程序表做事...",
                    "options": {
                        "A": "不合心意",
                        "B": "感到束缚"
                    }
                },
                {
                    "question_id": 59,
                    "text": "开始大项目时，你会...",
                    "options": {
                        "A": "列出工作步骤",
                        "B": "马上动工"
                    }
                },
                {
                    "question_id": 60,
                    "text": "社交场合中，你常感到...",
                    "options": {
                        "A": "与某些人难对话",
                        "B": "能与多数人长谈"
                    }
                },
                {
                    "question_id": 66,
                    "text": "社交场合中，你通常会...",
                    "options": {
                        "A": "与熟悉的人谈话",
                        "B": "参与大伙谈话"
                    }
                },
                {
                    "question_id": 70,
                    "text": "社交约会偏好...",
                    "options": {
                        "A": "事先安排",
                        "B": "随兴之所至"
                    }
                },
                {
                    "question_id": 76,
                    "text": "做事方式偏好...",
                    "options": {
                        "A": "按当天心情",
                        "B": "照程序表"
                    }
                },
                {
                    "question_id": 87,
                    "text": "偏好...",
                    "options": {
                        "A": "新颖的事物",
                        "B": "已知的事物"
                    }
                }
            ],
            "S-N维度": [
                {
                    "question_id": 3,
                    "text": "若你是老师，你会选教...",
                    "options": {
                        "A": "以事实为主的课程",
                        "B": "涉及理论的课程"
                    }
                },
                {
                    "question_id": 5,
                    "text": "你和哪些人比较合得来？",
                    "options": {
                        "A": "富于想象力的人",
                        "B": "现实的人"
                    }
                },
                {
                    "question_id": 9,
                    "text": "处理事情时，你倾向...",
                    "options": {
                        "A": "凭兴所至行事",
                        "B": "按照计划行事"
                    }
                },
                {
                    "question_id": 12,
                    "text": "大多数人会认为你...",
                    "options": {
                        "A": "重视自我隐私",
                        "B": "非常坦率开放"
                    }
                },
                {
                    "question_id": 14,
                    "text": "在一大群人中，通常是...",
                    "options": {
                        "A": "你介绍大家认识",
                        "B": "别人介绍你"
                    }
                },
                {
                    "question_id": 15,
                    "text": "你会跟哪些人做朋友？",
                    "options": {
                        "A": "常提出新注意的人",
                        "B": "脚踏实地的人"
                    }
                },
                {
                    "question_id": 22,
                    "text": "在社交聚会中，你...",
                    "options": {
                        "A": "有时感到郁闷",
                        "B": "常常乐在其中"
                    }
                },
                {
                    "question_id": 24,
                    "text": "哪些人更吸引你？",
                    "options": {
                        "A": "思想敏捷聪颖的人",
                        "B": "实事求是具常识的人"
                    }
                },
                {
                    "question_id": 26,
                    "text": "别人认识你所需时间...",
                    "options": {
                        "A": "要花很长时间",
                        "B": "用很短的时间"
                    }
                },
                {
                    "question_id": 32,
                    "text": "你倾向...",
                    "options": {
                        "A": "重视感情多于逻辑",
                        "B": "重视逻辑多于感情"
                    }
                },
                {
                    "question_id": 35,
                    "text": "你比较像...",
                    "options": {
                        "A": "热衷",
                        "B": "文静"
                    }
                },
                {
                    "question_id": 38,
                    "text": "你比较像...",
                    "options": {
                        "A": "冲动",
                        "B": "决定"
                    }
                },
                {
                    "question_id": 42,
                    "text": "你通常较喜欢的科目是...",
                    "options": {
                        "A": "讲授概念和原则的",
                        "B": "讲授事实和数据的"
                    }
                },
                {
                    "question_id": 44,
                    "text": "哪个是较高的赞誉？",
                    "options": {
                        "A": "一贯感性的人",
                        "B": "一贯理性的人"
                    }
                },
                {
                    "question_id": 50,
                    "text": "你认为按照程序表做事...",
                    "options": {
                        "A": "有时需要但不喜欢",
                        "B": "有帮助且喜欢"
                    }
                },
                {
                    "question_id": 53,
                    "text": "为乐趣阅读时，你偏好...",
                    "options": {
                        "A": "奇特或创新的表达",
                        "B": "作者直话直说"
                    }
                },
                {
                    "question_id": 55,
                    "text": "宁愿替哪类上司工作？",
                    "options": {
                        "A": "天性淳良但反复无常",
                        "B": "言词尖锐但合逻辑"
                    }
                },
                {
                    "question_id": 61,
                    "text": "做大型作业时，你选...",
                    "options": {
                        "A": "边做边想该做什么",
                        "B": "首先按步细分"
                    }
                },
                {
                    "question_id": 63,
                    "text": "你做事多数是...",
                    "options": {
                        "A": "按当天心情",
                        "B": "照拟好的程序表"
                    }
                },
                {
                    "question_id": 71,
                    "text": "你能否滔滔不绝地聊天？",
                    "options": {
                        "A": "只限有共同兴趣的人",
                        "B": "几乎跟任何人都可以"
                    }
                },
                {
                    "question_id": 73,
                    "text": "你认为比较重要的是...",
                    "options": {
                        "A": "据事实衡量",
                        "B": "考虑他人感受意见"
                    }
                },
                {
                    "question_id": 79,
                    "text": "偏好...",
                    "options": {
                        "A": "想象的",
                        "B": "真实的"
                    }
                },
                {
                    "question_id": 83,
                    "text": "你认为按程序表做事...",
                    "options": {
                        "A": "不合心意",
                        "B": "感到束缚"
                    }
                },
                {
                    "question_id": 89,
                    "text": "偏好...",
                    "options": {
                        "A": "具体的",
                        "B": "抽象的"
                    }
                }
            ],
            "T-F维度": [
                {
                    "question_id": 6,
                    "text": "你是否经常让...",
                    "options": {
                        "A": "情感支配理智",
                        "B": "理智主宰情感"
                    }
                },
                {
                    "question_id": 16,
                    "text": "你比较喜欢...",
                    "options": {
                        "A": "坐观事情发展才作计划",
                        "B": "很早就作计划"
                    }
                },
                {
                    "question_id": 23,
                    "text": "你通常...",
                    "options": {
                        "A": "和别人容易混熟",
                        "B": "趋向自处一隅"
                    }
                },
                {
                    "question_id": 27,
                    "text": "你宁愿被人认为...",
                    "options": {
                        "A": "实事求是的人",
                        "B": "机灵的人"
                    }
                },
                {
                    "question_id": 34,
                    "text": "在社交场合中，你经常感到...",
                    "options": {
                        "A": "与某些人难对话",
                        "B": "与多数人能长谈"
                    }
                },
                {
                    "question_id": 37,
                    "text": "你比较喜欢...",
                    "options": {
                        "A": "坐观事情发展才作计划",
                        "B": "很早就作计划"
                    }
                },
                {
                    "question_id": 40,
                    "text": "你认为比较重要的是...",
                    "options": {
                        "A": "据事实衡量",
                        "B": "考虑他人感受意见"
                    }
                },
                {
                    "question_id": 43,
                    "text": "你通常较喜欢的科目是...",
                    "options": {
                        "A": "讲授概念和原则的",
                        "B": "讲授事实和数据的"
                    }
                },
                {
                    "question_id": 45,
                    "text": "哪个是较高的赞誉？",
                    "options": {
                        "A": "一贯感性的人",
                        "B": "一贯理性的人"
                    }
                },
                {
                    "question_id": 47,
                    "text": "你认为按照程序表做事...",
                    "options": {
                        "A": "有时需要但不喜欢",
                        "B": "有帮助且喜欢"
                    }
                },
                {
                    "question_id": 51,
                    "text": "宁愿替哪类上司工作？",
                    "options": {
                        "A": "天性淳良但反复无常",
                        "B": "言词尖锐但合逻辑"
                    }
                },
                {
                    "question_id": 57,
                    "text": "做大型作业时，你选...",
                    "options": {
                        "A": "边做边想该做什么",
                        "B": "首先按步细分"
                    }
                },
                {
                    "question_id": 65,
                    "text": "你做事多数是...",
                    "options": {
                        "A": "按当天心情",
                        "B": "照拟好的程序表"
                    }
                },
                {
                    "question_id": 72,
                    "text": "你能否滔滔不绝地聊天？",
                    "options": {
                        "A": "只限有共同兴趣的人",
                        "B": "几乎跟任何人都可以"
                    }
                },
                {
                    "question_id": 80,
                    "text": "偏好...",
                    "options": {
                        "A": "仁慈慷慨的",
                        "B": "意志坚定的"
                    }
                },
                {
                    "question_id": 82,
                    "text": "你认为比较重要的是...",
                    "options": {
                        "A": "据事实衡量",
                        "B": "考虑他人感受意见"
                    }
                },
                {
                    "question_id": 84,
                    "text": "偏好...",
                    "options": {
                        "A": "具体的",
                        "B": "抽象的"
                    }
                }
            ],
            "J-P维度": [
                {
                    "question_id": 4,
                    "text": "你通常...",
                    "options": {
                        "A": "与人容易混熟",
                        "B": "比较沉静或矜持"
                    }
                },
                {
                    "question_id": 8,
                    "text": "你是否...",
                    "options": {
                        "A": "容易让人了解",
                        "B": "难于让人了解"
                    }
                },
                {
                    "question_id": 13,
                    "text": "你宁愿被人认为...",
                    "options": {
                        "A": "实事求是的人",
                        "B": "机灵的人"
                    }
                },
                {
                    "question_id": 17,
                    "text": "在社交场合中，你经常感到...",
                    "options": {
                        "A": "与某些人难对话",
                        "B": "与多数人能长谈"
                    }
                },
                {
                    "question_id": 19,
                    "text": "你通常较喜欢的科目是...",
                    "options": {
                        "A": "讲授概念和原则的",
                        "B": "讲授事实和数据的"
                    }
                },
                {
                    "question_id": 21,
                    "text": "你认为比较重要的是...",
                    "options": {
                        "A": "据事实衡量",
                        "B": "考虑他人感受意见"
                    }
                },
                {
                    "question_id": 25,
                    "text": "你做事多数是...",
                    "options": {
                        "A": "按当天心情",
                        "B": "照拟好的程序表"
                    }
                },
                {
                    "question_id": 29,
                    "text": "在社交场合中，你通常会...",
                    "options": {
                        "A": "和别人容易混熟",
                        "B": "趋向自处一隅"
                    }
                },
                {
                    "question_id": 31,
                    "text": "你通常较喜欢的科目是...",
                    "options": {
                        "A": "讲授概念和原则的",
                        "B": "讲授事实和数据的"
                    }
                },
                {
                    "question_id": 36,
                    "text": "你认为比较重要的是...",
                    "options": {
                        "A": "据事实衡量",
                        "B": "考虑他人感受意见"
                    }
                },
                {
                    "question_id": 39,
                    "text": "偏好...",
                    "options": {
                        "A": "具体的",
                        "B": "抽象的"
                    }
                },
                {
                    "question_id": 46,
                    "text": "你通常较喜欢的科目是...",
                    "options": {
                        "A": "讲授概念和原则的",
                        "B": "讲授事实和数据的"
                    }
                },
                {
                    "question_id": 48,
                    "text": "你认为比较重要的是...",
                    "options": {
                        "A": "据事实衡量",
                        "B": "考虑他人感受意见"
                    }
                },
                {
                    "question_id": 52,
                    "text": "偏好...",
                    "options": {
                        "A": "具体的",
                        "B": "抽象的"
                    }
                },
                {
                    "question_id": 54,
                    "text": "你通常较喜欢的科目是...",
                    "options": {
                        "A": "讲授概念和原则的",
                        "B": "讲授事实和数据的"
                    }
                },
                {
                    "question_id": 56,
                    "text": "你认为比较重要的是...",
                    "options": {
                        "A": "据事实衡量",
                        "B": "考虑他人感受意见"
                    }
                },
                {
                    "question_id": 58,
                    "text": "偏好...",
                    "options": {
                        "A": "具体的",
                        "B": "抽象的"
                    }
                },
                {
                    "question_id": 62,
                    "text": "你通常较喜欢的科目是...",
                    "options": {
                        "A": "讲授概念和原则的",
                        "B": "讲授事实和数据的"
                    }
                },
                {
                    "question_id": 64,
                    "text": "你认为比较重要的是...",
                    "options": {
                        "A": "据事实衡量",
                        "B": "考虑他人感受意见"
                    }
                },
                {
                    "question_id": 66,
                    "text": "偏好...",
                    "options": {
                        "A": "具体的",
                        "B": "抽象的"
                    }
                },
                {
                    "question_id": 68,
                    "text": "你通常较喜欢的科目是...",
                    "options": {
                        "A": "讲授概念和原则的",
                        "B": "讲授事实和数据的"
                    }
                },
                {
                    "question_id": 74,
                    "text": "偏好...",
                    "options": {
                        "A": "具体的",
                        "B": "抽象的"
                    }
                },
                {
                    "question_id": 78,
                    "text": "你通常较喜欢的科目是...",
                    "options": {
                        "A": "讲授概念和原则的",
                        "B": "讲授事实和数据的"
                    }
                },
                {
                    "question_id": 86,
                    "text": "偏好...",
                    "options": {
                        "A": "具体的",
                        "B": "抽象的"
                    }
                },
                {
                    "question_id": 90,
                    "text": "你通常较喜欢的科目是...",
                    "options": {
                        "A": "讲授概念和原则的",
                        "B": "讲授事实和数据的"
                    }
                },
                {
                    "question_id": 92,
                    "text": "偏好...",
                    "options": {
                        "A": "具体的",
                        "B": "抽象的"
                    }
                },
                {
                    "question_id": 93,
                    "text": "你通常较喜欢的科目是...",
                    "options": {
                        "A": "讲授概念和原则的",
                        "B": "讲授事实和数据的"
                    }
                }
            ]
        };
        
        // 将问题按维度组织
        this.questions = [
            ...data['E-I维度'].map(q => ({ ...q, dimension: 'E-I' })),
            ...data['S-N维度'].map(q => ({ ...q, dimension: 'S-N' })),
            ...data['T-F维度'].map(q => ({ ...q, dimension: 'T-F' })),
            ...data['J-P维度'].map(q => ({ ...q, dimension: 'J-P' }))
        ];
        
        // 随机打乱问题顺序
        this.shuffleArray(this.questions);
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    bindEvents() {
        // 开始测试按钮
        document.getElementById('start-btn').addEventListener('click', () => {
            this.showScreen('test-screen');
            this.showQuestion();
        });

        // 选项按钮
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.selectOption(e.target.closest('.option-btn').dataset.option);
            });
        });

        // 上一个按钮
        document.getElementById('prev-btn').addEventListener('click', () => {
            this.previousQuestion();
        });

        // 下一个按钮
        document.getElementById('next-btn').addEventListener('click', () => {
            this.nextQuestion();
        });

        // 重新测试按钮
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });

        // 分享按钮
        document.getElementById('share-btn').addEventListener('click', () => {
            this.shareResult();
        });
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        
        // 更新进度条
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        document.querySelector('.progress-fill').style.width = `${progress}%`;
        
        // 更新问题计数器
        document.getElementById('current-question').textContent = this.currentQuestionIndex + 1;
        document.getElementById('total-questions').textContent = this.questions.length;
        
        // 显示问题
        document.getElementById('question-text').textContent = question.text;
        
        // 显示选项
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns[0].querySelector('.option-text').textContent = question.options.A;
        optionBtns[1].querySelector('.option-text').textContent = question.options.B;
        
        // 显示当前答案（如果有）
        this.showCurrentAnswer();
        
        // 更新导航按钮状态
        this.updateNavigationButtons();
    }

    showCurrentAnswer() {
        const question = this.questions[this.currentQuestionIndex];
        const currentAnswer = this.answers[question.question_id];
        
        // 重置所有选项状态
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        // 显示当前答案
        if (currentAnswer) {
            document.querySelector(`[data-option="${currentAnswer}"]`).classList.add('selected');
        }
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        // 上一个按钮状态
        prevBtn.disabled = this.currentQuestionIndex === 0;
        
        // 下一个按钮状态
        if (this.currentQuestionIndex === this.questions.length - 1) {
            nextBtn.textContent = '查看结果';
        } else {
            nextBtn.textContent = '下一个';
        }
    }

    selectOption(option) {
        const question = this.questions[this.currentQuestionIndex];
        
        // 移除之前的答案（如果存在）
        if (this.answers[question.question_id]) {
            const oldOption = this.answers[question.question_id];
            this.dimensionScores[question.dimension][this.getDimensionScore(question.dimension, oldOption)]--;
        }
        
        // 设置新答案
        this.answers[question.question_id] = option;
        
        // 更新维度分数
        this.updateDimensionScore(question.dimension, option);
        
        // 显示选中状态
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`[data-option="${option}"]`).classList.add('selected');
        
        // 延迟后自动进入下一题
        setTimeout(() => {
            this.nextQuestion();
        }, 500);
    }

    getDimensionScore(dimension, option) {
        const dimensionMap = {
            'E-I': { A: 'E', B: 'I' },
            'S-N': { A: 'S', B: 'N' },
            'T-F': { A: 'T', B: 'F' },
            'J-P': { A: 'J', B: 'P' }
        };
        
        return dimensionMap[dimension][option];
    }

    updateDimensionScore(dimension, option) {
        const score = this.getDimensionScore(dimension, option);
        this.dimensionScores[dimension][score]++;
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.showQuestion();
        }
    }

    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.showQuestion();
        } else {
            this.showResults();
        }
    }

    showResults() {
        this.calculateResults();
        this.showScreen('result-screen');
    }

    calculateResults() {
        const personalityType = [];
        const percentages = {};
        
        // 计算每个维度的百分比
        Object.entries(this.dimensionScores).forEach(([dimension, scores]) => {
            const total = scores[Object.keys(scores)[0]] + scores[Object.keys(scores)[1]];
            const firstLetter = Object.keys(scores)[0];
            const secondLetter = Object.keys(scores)[1];
            
            const firstPercentage = total > 0 ? (scores[firstLetter] / total) * 100 : 50;
            const secondPercentage = 100 - firstPercentage;
            
            // 确定主导类型
            const dominantType = scores[firstLetter] >= scores[secondLetter] ? firstLetter : secondLetter;
            personalityType.push(dominantType);
            
            percentages[dimension] = {
                [firstLetter]: Math.round(firstPercentage),
                [secondLetter]: Math.round(secondPercentage),
                dominant: dominantType
            };
        });
        
        // 显示结果
        document.getElementById('personality-type').textContent = personalityType.join('');
        
        // 更新维度条
        this.updateDimensionBars(percentages);
        
        // 显示职业建议
        this.showCareerRecommendations(personalityType.join(''));
    }

    updateDimensionBars(percentages) {
        const dimensionMap = {
            'E-I': 'ei',
            'S-N': 'sn',
            'T-F': 'tf',
            'J-P': 'jp'
        };
        
        Object.entries(percentages).forEach(([dimension, data]) => {
            const id = dimensionMap[dimension];
            const fillElement = document.getElementById(`${id}-fill`);
            const valueElement = document.getElementById(`${id}-value`);
            
            const dominantType = data.dominant;
            const percentage = data[dominantType];
            
            fillElement.style.width = `${percentage}%`;
            valueElement.textContent = `${dominantType}: ${percentage}%`;
        });
    }

    showCareerRecommendations(personalityType) {
        const careerRecommendations = this.getCareerRecommendations(personalityType);
        const careerList = document.getElementById('career-list');
        
        careerList.innerHTML = careerRecommendations.map(career => 
            `<div class="career-item">${career}</div>`
        ).join('');
    }

    getCareerRecommendations(personalityType) {
        const careerMap = {
            'INTJ': ['战略分析师', '投资银行家', '科学家', '工程师', '管理顾问', '建筑师'],
            'INTP': ['软件工程师', '研究员', '哲学家', '数学家', '物理学家', '系统分析师'],
            'ENTJ': ['企业高管', '管理顾问', '律师', '企业家', '项目经理', '投资顾问'],
            'ENTP': ['企业家', '创新顾问', '营销总监', '政治顾问', '记者', '发明家'],
            'INFJ': ['心理咨询师', '作家', '教师', '人力资源专员', '社工', '编辑'],
            'INFP': ['作家', '艺术家', '心理咨询师', '翻译', '社工', '设计师'],
            'ENFJ': ['教师', '人力资源经理', '公关专员', '培训师', '销售经理', '社工'],
            'ENFP': ['记者', '营销专员', '演员', '教师', '创意总监', '活动策划'],
            'ISTJ': ['会计师', '审计师', '项目经理', '行政主管', '质量检查员', '军人'],
            'ISFJ': ['护士', '行政助理', '教师', '社工', '客户服务', '图书管理员'],
            'ESTJ': ['企业管理者', '项目经理', '销售经理', '军官', '法官', '行政主管'],
            'ESFJ': ['人力资源专员', '销售代表', '护士', '教师', '客户服务', '活动策划'],
            'ISTP': ['技术员', '机械师', '飞行员', '运动员', '法医', '工程师'],
            'ISFP': ['艺术家', '设计师', '摄影师', '护士', '美容师', '园艺师'],
            'ESTP': ['企业家', '销售代表', '运动员', '警察', '消防员', '机械师'],
            'ESFP': ['演员', '销售代表', '活动策划', '导游', '美容师', '教师']
        };
        
        return careerMap[personalityType] || ['职业顾问', '人力资源专员', '培训师', '销售代表'];
    }

    restart() {
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.dimensionScores = {
            'E-I': { E: 0, I: 0 },
            'S-N': { S: 0, N: 0 },
            'T-F': { T: 0, F: 0 },
            'J-P': { J: 0, P: 0 }
        };
        this.showScreen('welcome-screen');
    }

    shareResult() {
        const personalityType = document.getElementById('personality-type').textContent;
        const shareText = `我的MBTI性格类型是 ${personalityType}！快来测试你的性格类型吧！`;
        
        if (navigator.share) {
            navigator.share({
                title: 'MBTI性格测试结果',
                text: shareText,
                url: window.location.href
            });
        } else {
            // 复制到剪贴板
            navigator.clipboard.writeText(shareText).then(() => {
                alert('结果已复制到剪贴板！');
            });
        }
    }

    updateTotalQuestions() {
        document.getElementById('total-questions').textContent = this.questions.length;
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new MBTITest();
});
