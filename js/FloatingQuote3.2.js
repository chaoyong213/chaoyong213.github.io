class FloatingQuote {
    constructor(options = {}) {
        this.icon = options.icon || '💬'; // 默认图标
        this.position = options.position || 'bottom-right'; // 默认按钮位置
        this.createButton();
        this.createQuoteContainer();
        this.setPosition(); // 设置按钮位置
        this.bindEvents();
        this.makeDraggable(); // 使按钮可拖动
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.className = 'floating-button';
        
        // 如果 icon 是图片，则创建 img 元素
        // if (this.icon.startsWith('http')) {
        if (this.icon) {
            const img = document.createElement('img');
            img.src = this.icon;
            img.alt = '今日一言';
            img.title = '今日一言';
            img.style.width = '100%'; // 适应按钮大小
            img.className = 'rotating-icon'; // 添加旋转动画的类
            this.button.appendChild(img);
        } else {
            this.button.innerHTML = this.icon; // 否则直接使用文本图标
        }
        
        document.body.appendChild(this.button);

        // 添加样式
        const style = document.createElement('style');
        style.innerHTML = `
            .floating-button {
                position: fixed;
                bottom: 20px; /* 默认底部 */
                right: 0; /* 默认右侧 */
                background-color: transparent; /* 背景透明 */
                border: none; /* 无边框 */
                border-radius: 50%; /* 圆形按钮 */
                width: 60px; /* 按钮宽度 */
                height: 60px; /* 按钮高度 */
                cursor: pointer; /* 鼠标指针 */
                z-index: 1001; /* 确保在最上层 */
                transition: all 0.3s ease;
            }
            .rotating-icon {
                animation: rotate 2s linear infinite; /* 添加旋转动画 */
            }
            @keyframes rotate {
                from {
                    transform: rotate(0deg);
                }
                to {
                    transform: rotate(360deg);
                }
            }
            .quote-container {
                display: none; /* 初始隐藏 */
                position: fixed;
                top: 50%; /* 固定在中间 */
                left: 50%; /* 固定在中间 */
                transform: translate(-50%, -50%); /* 中心对齐 */
                background-color: #ffffff;
                border-radius: 15px;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                padding: 20px;
                width: 300px;
                z-index: 1000; /* 确保在按钮下方 */
                transition: all 0.3s ease;
            }
            .quote-content {
                font-size: 1.2em;
                margin: 10px 0;
                line-height: 1.6;
                font-style: italic;
                color: #2c3e50;
            }
            .quote-author {
                font-size: 1em;
                color: #34495e;
                margin-top: 5px;
                font-weight: bold;
            }
            .quote-date, .quote-from {
                font-size: 0.8em;
                color: #7f8c8d;
                margin-top: 5px;
            }
            .quote-image {
                margin-top: 10px;
                max-width: 100%;
                border-radius: 10px;
                box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
            }
            .close-button {
                display:none;
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                position: absolute;
                top: 10px;
                right: 10px;
                color: #333;
            }
        `;
        document.head.appendChild(style);
    }

    createQuoteContainer() {
        this.quoteContainer = document.createElement('div');
        this.quoteContainer.className = 'quote-container';
        document.body.appendChild(this.quoteContainer);

        this.quoteContainer.innerHTML = `
            <button class="close-button" id="closeButton">✖</button>
            <div class="quote-content" id="quoteContent"></div>
            <div class="quote-author" id="quoteAuthor"></div>
            <div class="quote-date" id="quoteDate"></div>
            <div class="quote-from" id="quoteFrom"></div>
            <img src="" alt="每日一言图片" class="quote-image" id="quoteImage">
        `;
    }

    setPosition() {
        switch (this.position) {
            case 'top-left':
                this.button.style.top = '20px';
                this.button.style.left = '2px';
                break;
            case 'top-right':
                this.button.style.top = '20px';
                this.button.style.right = '2px';
                break;
            case 'bottom-left':
                this.button.style.bottom = '20px';
                this.button.style.left = '20px';
                break;
            case 'bottom-right':
                this.button.style.bottom = '20px';
                this.button.style.right = '2px';
                break;
            case 'middle-left': // 左边中间位置
                this.button.style.top = '50%';
                this.button.style.left = '2px';
                this.button.style.transform = 'translateY(-50%)'; // 垂直居中
                break;
            case 'middle-right': // 右边中间位置
                this.button.style.top = '50%';
                this.button.style.right = '2px';
                this.button.style.transform = 'translateY(-50%)'; // 垂直居中
                break;
            default:
                this.button.style.bottom = '20px';
                this.button.style.right = '2px';
                break;
        }
    }



    async fetchQuote() {
        try {
            const response = await fetch('https://api.oioweb.cn/api/common/yiyan'); // 替换为实际 API
            const data = await response.json();
            if (data.code === 200) {
                document.getElementById('quoteContent').innerText = data.result.content;
                document.getElementById('quoteAuthor').innerText = `—— ${data.result.author}`;
                document.getElementById('quoteDate').innerText = `日期：${data.result.date}`;
                document.getElementById('quoteFrom').innerText = `来源：${data.result.from}`;
                document.getElementById('quoteImage').src = data.result.pic_url;
            } else {
                console.error('获取数据失败:', data.msg);
            }
        } catch (error) {
            console.error('请求错误:', error);
        }
    }

    bindEvents() {
        this.button.onclick = () => {
            if (this.quoteContainer.style.display === 'none' || this.quoteContainer.style.display === '') {
                this.fetchQuote(); // 获取数据
                this.quoteContainer.style.display = 'block'; // 显示浮窗
            } else {
                this.quoteContainer.style.display = 'none'; // 隐藏浮窗
            }
        };

        // 绑定关闭按钮事件
        document.getElementById('closeButton').onclick = () => {
            this.quoteContainer.style.display = 'none'; // 隐藏浮窗
        };
    }

    makeDraggable() {
        let isDragging = false;
        let offsetX, offsetY;

        const startDrag = (e) => {
            isDragging = true;
            offsetX = e.clientX - this.button.getBoundingClientRect().left;
            offsetY = e.clientY - this.button.getBoundingClientRect().top;
            document.body.style.cursor = 'grabbing';
        };

        const drag = (e) => {
            if (isDragging) {
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;
                this.button.style.left = `${x}px`;
                this.button.style.top = `${y}px`;
            }
        };

        const endDrag = () => {
            isDragging = false;
            document.body.style.cursor = 'default';
            // 设置定时器，2秒后自动吸附
            this.autoSnapTimeout = setTimeout(() => {
                this.snapToEdge();
            }, 2000);
        };

        // 绑定鼠标事件
        this.button.onmousedown = startDrag;
        document.onmouseup = endDrag;
        document.onmousemove = drag;

        // 绑定触摸事件
        this.button.ontouchstart = (e) => {
            startDrag(e.touches[0]);
        };
        document.ontouchend = endDrag;
        document.ontouchmove = (e) => {
            drag(e.touches[0]);
        };
    }
    snapToEdge() {
        const rect = this.button.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // 计算距离四个边的距离
        const distanceToLeft = rect.left;
        const distanceToRight = windowWidth - rect.right;
        const distanceToTop = rect.top;
        const distanceToBottom = windowHeight - rect.bottom;

        // 找到最小距离并吸附
        const minDistance = Math.min(distanceToLeft, distanceToRight, distanceToTop, distanceToBottom);

        if (minDistance === distanceToLeft) {
            this.button.style.left = '0px'; // 吸附到左边
            this.button.style.top = `${Math.min(Math.max(rect.top, 0), windowHeight - rect.height)}px`; // 垂直居中
        } else if (minDistance === distanceToRight) {
            this.button.style.left = `${windowWidth - rect.width}px`; // 吸附到右边
            this.button.style.top = `${Math.min(Math.max(rect.top, 0), windowHeight - rect.height)}px`; // 垂直居中
        } else if (minDistance === distanceToTop) {
            this.button.style.top = '20px'; // 吸附到顶部
            this.button.style.left = `${Math.min(Math.max(rect.left, 0), windowWidth - rect.width)}px`; // 水平居中
        } else if (minDistance === distanceToBottom) {
            this.button.style.top = `${windowHeight - rect.height}px`; // 吸附到底部
            this.button.style.left = `${Math.min(Math.max(rect.left, 0), windowWidth - rect.width)}px`; // 水平居中
        }
    }
}

// 确保在 DOM 加载完成后实例化
document.addEventListener('DOMContentLoaded', () => {
    new FloatingQuote({
        icon: 'data:image/png;base64,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', // 自定义图标，可以是图片 URL
        position: 'middle-right' // 设置为右边中间
    });
});
