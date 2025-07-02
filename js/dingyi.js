// 1.标签页面波浪效果与鼠标悬浮放大效果
// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function () {
    // 获取所有标签元素
    const tags = document.querySelectorAll('.tag-cloud-tags a');

    // 设置标签波浪动画
    tags.forEach((tag, index) => {
        // 初始状态
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        tag.style.transition = 'none';

        // 设置波浪动画延迟
        setTimeout(() => {
            tag.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, 100 * (index + 1)); // 每个标签延迟100ms
    });

    // 为每个标签添加悬停效果
    tags.forEach(tag => {
        // 鼠标进入
        tag.addEventListener('mouseenter', function () {
            this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
            this.style.transform = 'translateY(-6px) scale(1.5)';
            this.style.zIndex = '10';
        });

        // 鼠标离开
        tag.addEventListener('mouseleave', function () {
            this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
    });
});

// 2.分类页面波浪效果
// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function () {
    // 获取所有分类列表项
    const categoryItems = document.querySelectorAll('.category-list-item');

    if (categoryItems.length === 0) return;

    // 按行分组元素
    const itemsByRow = groupItemsByRow(categoryItems);

    // 为每行设置波浪动画
    itemsByRow.forEach((row, rowIndex) => {
        // 每行延迟300ms，形成明显的波浪效果
        const rowDelay = rowIndex * 300;

        row.forEach((item, itemIndex) => {
            // 获取分类链接和计数元素
            const link = item.querySelector('.category-list-link');
            const count = item.querySelector('.category-list-count');

            // 初始状态：隐藏并下移
            if (link) {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
                link.style.transition = 'none';
            }

            if (count) {
                count.style.opacity = '0';
                count.style.transform = 'translateY(20px)';
                count.style.transition = 'none';
            }

            // 设置动画延迟（行延迟 + 行内小延迟，形成层次感）
            setTimeout(() => {
                if (link) {
                    link.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }

                if (count) {
                    setTimeout(() => {
                        count.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        count.style.opacity = '1';
                        count.style.transform = 'translateY(0)';
                    }, 150); // 计数元素稍晚出现
                }
            }, rowDelay + (itemIndex * 50)); // 行内元素小延迟，使同一行内有细微差异
        });
    });

    // 按行分组元素的辅助函数
    function groupItemsByRow(items) {
        const rows = [];
        let currentRow = [];
        let currentTop = null;

        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemTop = Math.round(rect.top);

            // 如果是第一个元素或新的一行
            if (currentTop === null || Math.abs(itemTop - currentTop) > 5) {
                if (currentRow.length > 0) {
                    rows.push(currentRow);
                }
                currentRow = [item];
                currentTop = itemTop;
            } else {
                // 同一行的元素
                currentRow.push(item);
            }
        });

        // 添加最后一行
        if (currentRow.length > 0) {
            rows.push(currentRow);
        }

        return rows;
    }
});
