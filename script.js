document.addEventListener('DOMContentLoaded', function() {
    // Основные табы приложения
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabHighlight = document.querySelector('.tab-highlight');
    const tabBar = document.querySelector('.tab-bar');
    const tabContents = document.querySelectorAll('.tab-content');
    
    function updateHighlightPosition(activeButton) {
        if (!activeButton || !tabHighlight) return;
        
        const buttonRect = activeButton.getBoundingClientRect();
        const barRect = tabBar.getBoundingClientRect();
        
        const left = buttonRect.left - barRect.left;
        const width = buttonRect.width;
        
        tabHighlight.style.left = `${left}px`;
        tabHighlight.style.width = `${width}px`;
    }
    
    function switchTab(tabName) {
        tabButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tabName);
        });
        
        tabContents.forEach(content => {
            content.classList.toggle('active', content.dataset.tabContent === tabName);
        });
        
        const activeButton = document.querySelector(`.tab-button[data-tab="${tabName}"]`);
        updateHighlightPosition(activeButton);
    }
    
    // Инициализация основных табов
    const activeTab = document.querySelector('.tab-button.active');
    if (activeTab) {
        updateHighlightPosition(activeTab);
        switchTab(activeTab.dataset.tab);
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
    });
    
    window.addEventListener('resize', function() {
        const activeButton = document.querySelector('.tab-button.active');
        updateHighlightPosition(activeButton);
    });

    // Модальное окно пополнения баланса
    const refreshIcon = document.querySelector('.Balance .refresh-icon');
    const modal = document.getElementById('balanceModal');
    if (modal) {
        const closeBtn = modal.querySelector('.modal-close');
        const confirmBtn = modal.querySelector('.confirm-btn');
        const paymentSelector = modal.querySelector('.payment-selector');
        const selectorHeader = modal.querySelector('.selector-header');
        const methodOptions = modal.querySelectorAll('.method-option');
        const selectedMethodDisplay = modal.querySelector('#selectedMethodDisplay');
        const methodIconSelected = modal.querySelector('.method-icon-selected');
        const methodNameSelected = modal.querySelector('.method-name-selected');
        
        let selectedMethod = null;

        if (refreshIcon) {
            refreshIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                modal.style.display = 'flex';
                methodOptions.forEach(opt => opt.classList.remove('active'));
                if (paymentSelector) paymentSelector.classList.remove('expanded');
                if (selectedMethodDisplay) selectedMethodDisplay.style.display = 'none';
                selectedMethod = null;
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }

        if (selectorHeader && paymentSelector) {
            selectorHeader.addEventListener('click', function() {
                paymentSelector.classList.toggle('expanded');
            });
        }

        methodOptions.forEach(option => {
            option.addEventListener('click', function() {
                const method = this.dataset.method;
                const iconElement = this.querySelector('.method-icon');
                const textElement = this.querySelector('span');
                
                if (methodIconSelected && iconElement) {
                    methodIconSelected.src = iconElement.src;
                }
                if (methodNameSelected && textElement) {
                    methodNameSelected.textContent = textElement.textContent;
                }
                if (selectedMethodDisplay) {
                    selectedMethodDisplay.style.display = 'flex';
                }
                
                if (paymentSelector) paymentSelector.classList.remove('expanded');
                selectedMethod = method;
            });
        });

        if (confirmBtn) {
            confirmBtn.addEventListener('click', function() {
                const amountInput = document.getElementById('amount');
                const promoInput = document.getElementById('promo');
                const amount = amountInput ? amountInput.value : null;
                const promo = promoInput ? promoInput.value : null;
                
                if (!amount) {
                    alert('Пожалуйста, введите сумму');
                    return;
                }
                
                if (!selectedMethod) {
                    alert('Пожалуйста, выберите способ оплаты');
                    return;
                }
                
                console.log(`Пополнение на ${amount} через ${selectedMethod} с промокодом ${promo}`);
                alert(`Инициировано пополнение на ${amount} через ${getMethodName(selectedMethod)}!`);
                modal.style.display = 'none';
            });
        }

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Функция для управления табами в играх
function setupGamesTabs() {
    const tabButtons = document.querySelectorAll('.games-tab-button');
    const tabContents = document.querySelectorAll('.games-content');
    const tabHighlight = document.querySelector('.games-tab-highlight');
    
    function updateHighlightPosition(activeButton) {
        if (!activeButton || !tabHighlight) return;
        
        const buttonRect = activeButton.getBoundingClientRect();
        const tabsRect = activeButton.parentElement.getBoundingClientRect();
        
        const left = buttonRect.left - tabsRect.left;
        const width = buttonRect.width;
        
        tabHighlight.style.left = `${left}px`;
        tabHighlight.style.width = `${width}px`;
    }
    
    function switchTab(tabName) {
        tabButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.gameTab === tabName);
        });
        
        tabContents.forEach(content => {
            content.classList.toggle('active', content.dataset.gameContent === tabName);
        });
        
        const activeButton = document.querySelector(`.games-tab-button[data-game-tab="${tabName}"]`);
        updateHighlightPosition(activeButton);
    }
    
    // Инициализация
    const activeTab = document.querySelector('.games-tab-button.active');
    if (activeTab) {
        updateHighlightPosition(activeTab);
        switchTab(activeTab.dataset.gameTab);
    }
    
    // Обработчики кликов
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.dataset.gameTab;
            switchTab(tabName);
        });
    });
}

    // Функция для управления табами в розыгрышах
    function setupRafflesTabs() {
        const container = document.querySelector('.raffles-tabs');
        if (!container) return;

        const tabButtons = container.querySelectorAll('.raffles-tab-button');
        const tabContents = document.querySelectorAll('.raffles-content');
        const tabHighlight = container.querySelector('.raffles-tab-highlight');

        function updateHighlightPosition(activeButton) {
            if (!activeButton || !tabHighlight) return;
            
            const buttonRect = activeButton.getBoundingClientRect();
            const tabsRect = activeButton.parentElement.getBoundingClientRect();
            
            const left = buttonRect.left - tabsRect.left;
            const width = buttonRect.width;
            
            tabHighlight.style.left = `${left}px`;
            tabHighlight.style.width = `${width}px`;
        }

        function switchTab(tabName) {
            tabButtons.forEach(button => {
                button.classList.toggle('active', button.dataset.raffleTab === tabName);
            });
            
            tabContents.forEach(content => {
                content.classList.toggle('active', content.dataset.raffleContent === tabName);
            });
            
            const activeButton = container.querySelector(`.raffles-tab-button.active`);
            updateHighlightPosition(activeButton);
        }

        // Инициализация
        const activeTab = container.querySelector(`.raffles-tab-button.active`);
        if (activeTab) {
            updateHighlightPosition(activeTab);
            switchTab(activeTab.dataset.raffleTab);
        }
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabName = this.dataset.raffleTab;
                switchTab(tabName);
            });
        });
    }

    // Инициализация табов
    setupGamesTabs();
    setupRafflesTabs();
});

function getMethodName(method) {
    const methods = {
        'card': 'банковскую карту',
        'crypto': 'криптовалюту',
        'sbp': 'СБП'
    };
    return methods[method] || method;
}

document.querySelectorAll('.bonus-case').forEach(caseElement => {
caseElement.addEventListener('mouseenter', function() {
this.style.transform = 'translateY(-5px)';
this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
this.querySelector('.roulette-circle').style.transform = 'scale(1.1)';
});

caseElement.addEventListener('mouseleave', function() {
    this.style.transform = '';
    this.style.boxShadow = '';
    this.querySelector('.roulette-circle').style.transform = '';
});
});

// Обработчики для кейсов
// Обработчики для кейсов
document.querySelectorAll('.bonus-item').forEach(item => {
    item.addEventListener('click', function() {
        const caseType = this.dataset.case;
        openCase(caseType);
    });
});

function openCase(caseType) {
    // Скрываем заголовок и меню вкладок
    document.querySelector('.games-header').classList.add('hidden');
    
    // Скрываем все вкладки игр
    document.querySelectorAll('.games-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Показываем вкладку с открытым кейсом
    const caseOpenTab = document.querySelector('.games-content[data-game-content="case-open"]');
    caseOpenTab.classList.add('active');
    
    // Обновляем содержимое кейса
    updateCaseContent(caseType);
    
    // Показываем стрелку с задержкой и анимацией
    setTimeout(() => {
        document.querySelector('.back-arrow').classList.add('visible');
    }, 300);
}

function updateCaseContent(caseType) {
    // В зависимости от типа кейса обновляем содержимое
    const caseTitle = document.querySelector('.case-content .case-title');
    const caseImage = document.querySelector('.case-content .case-image');
    
    switch(caseType) {
        case 'bronze':
            caseTitle.textContent = 'Бронзовый кейс';
            caseImage.src = 'icons/beggar-icon.png';
            break;
        case 'silver':
            caseTitle.textContent = 'Серебряный кейс';
            caseImage.src = 'icons/silver-case-icon.png';
            break;
        case 'gold':
            caseTitle.textContent = 'Золотой кейс';
            caseImage.src = 'icons/gold-case-icon.png';
            break;
        case 'platinum':
            caseTitle.textContent = 'Платиновый кейс';
            caseImage.src = 'icons/platinum-case-icon.png';
            break;
    }
    
    // Обновляем иконки кнопок
    document.querySelector('.open-normal .case-button-icon').src = 'icons/open-icon.png';
    document.querySelector('.open-fast .case-button-icon').src = 'icons/fast-icon.png';
}

// Обработчик кнопки "Назад"
document.querySelector('.back-button').addEventListener('click', function() {
    // Скрываем стрелку перед переходом
    document.querySelector('.back-arrow').classList.remove('visible');
    
    // Показываем заголовок и меню вкладок
    document.querySelector('.games-header').classList.remove('hidden');
    
    // Возвращаемся к списку кейсов
    document.querySelectorAll('.games-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelector('.games-content[data-game-content="cases"]').classList.add('active');
});

// Обработчики кнопок открытия кейса
document.querySelectorAll('.case-button').forEach(button => {
    button.addEventListener('click', function() {
        const isFast = this.classList.contains('open-fast');
        alert(`Кейс будет открыт ${isFast ? 'быстро' : 'обычным способом'}`);
        // Здесь можно добавить логику открытия кейса
    });
});