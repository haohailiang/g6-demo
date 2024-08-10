向左拖动
    1个节点
        group 全部平移
        sublayer  全部平移
        layer  全部平移
    2个节点
        第一个group
            只需要关注右边BBox maxX
                maxX比之前小
                    同级的group往左平移
                    直接的sublayer往左收缩
                        右兄弟的sublayer往左平移
                    直接的layer往左收缩
        中间的group
            minX比之前小
                左同级的group往左平移
                直接的sublayer往左扩展
                    左兄弟的sublayer往左平移
                直接的layer往左扩展
            maxX比之前小
                右同级的group往左平移
                直接的sublayer往左收缩
                    右兄弟的sublayer往左平移
                直接的layer往左收缩
        最后一个group
            只需要关注左边BBox minX
                minX比之前小
                    同级的group往左平移
                    直接的sublayer往左扩展
                        左兄弟的sublayer往左平移
                    直接的layer往左扩展


向右拖动
    1个节点
        group 全部平移
        sublayer  全部平移
        layer  全部平移
    2个节点
        第一个group
            只需要关注右边BBox maxX
                maxX比之前大
                    同级的group往右平移
                    直接的sublayer往右扩展
                        右兄弟的sublayer往右平移
                    直接的layer往右扩展
        中间的group
            minX比之前大
                    同级的group往右平移
                    直接的sublayer往右收缩
                        左兄弟的sublayer往右平移
                    直接的layer往右收缩
            maxX比之前大
                    同级的group往右平移
                    直接的sublayer往右扩展
                        右兄弟的sublayer往右平移
                    直接的layer往右扩展
        最后一个group
            只需要关注左边BBox minX
                minX比之前大
                    同级的group往右平移
                    直接的sublayer往右收缩
                        左兄弟的sublayer往右平移
                    直接的layer往右收缩

向上拖动
    1个节点
        group 全部平移
        sublayer  全部平移
        layer  全部平移
    2个节点
        滑动过程中， 其他的都是上下居中
向下拖动
    1个节点
        group 全部平移
        sublayer  全部平移
        layer  全部平移
    2个节点
        滑动过程中， 其他的都是上下居中
