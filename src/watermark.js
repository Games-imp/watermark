/**
 * Created by astronaut007 on 2018/10/23
 */
!(function() {
  var WaterMark = BI.inherit(BI.Widget, {
    props: {
      baseCls: "bi-watermark",
      watermark: {},
      angle: 20 // 水印倾斜度数
    },

    mounted: function() {
      var self = this,
        o = this.options;
      this.element.css({
        fontSize: this.value.fontSize + "px",
        color: this.value.color
      });
      this._showWatermark();
      BI.ResizeDetector.addResizeListener(this, function() {
        self._showWatermark();
      });
    },

    render: function() {
      var self = this,
        o = this.options;
      this.value = BI.extend(
        {
          text: "",
          fontSize: 12,
          color: "#333"
        },
        o.watermark
      );
      this.deg = (Math.PI / 180) * this.options.angle;
      this.markWidth =
        BI.DOM.getTextSizeWidth(this.value.text, this.value.fontSize) + 100;
      return {
        type: "bi.absolute",
        ref: function(ref) {
          self.container = ref;
        },
        items: [
          {
            el: {
              type: "bi.virtual_group",
              layouts: [
                {
                  type: "bi.vertical",
                  bgap: 60
                }
              ],
              cls: "watermark-container",
              ref: function(ref) {
                self.watermarkContainer = ref;
              }
            },
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          }
        ]
      };
    },

    _showWatermark: function() {
      var self = this,
        o = this.options;
      var items = [],
        actualSize = this._getContainerSize();
      var watermarkHeight =
        BI.DOM.getTextSizeHeight(this.value.text, this.value.fontSize) + 60;
      var col = BI.parseInt(actualSize.width / this.markWidth);
      var row = BI.parseInt(actualSize.height / watermarkHeight);
      var style = this._addFilterForOldIE();
      for (var r = 0; r < row + 1; r++) {
        var rowItems = [];
        for (var c = 0; c < col + 3; c++) {
          var markItem = BI.createWidget({
            type: "bi.label",
            hgap: 50,
            cls: "watermark-text",
            text: this.value.text
          });
          markItem.element.css(style);
          rowItems.push(markItem);
        }
        items.push({
          el: {
            type: "bi.horizontal",
            scrollx: false,
            items: rowItems
          },
          lgap: r % 2 === 0 ? -100 : 0
        });
      }
      this.watermarkContainer.populate(items);

      this.container.attr("items")[0].left = -this._getContainerLeft();
      this.container.attr("items")[0].right = -this.markWidth;
      this.container.attr("items")[0].bottom = -this._getContainerBottom();
      this.container.resize();
    },

    _addFilterForOldIE: function() {
      if (BI.isIE9Below()) {
        var rad = -this.deg;
        var m11 = Math.cos(rad),
          m12 = -1 * Math.sin(rad),
          m21 = Math.sin(rad),
          m22 = m11;

        var filters =
          "progid:DXImageTransform.Microsoft.Chroma(color='white') progid:DXImageTransform.Microsoft.Matrix(M11=" +
          m11 +
          ",M12=" +
          m12 +
          ",M21=" +
          m21 +
          ",M22=" +
          m22 +
          ",SizingMethod='auto expand')";
        return {
          filter: filters
        };
      }
      return {};
    },

    _getContainerSize: function() {
      var height = this.element.height(),
        width = this.element.width();
      return {
        width: width * Math.cos(this.deg) + height * Math.sin(this.deg),
        height: width * Math.sin(this.deg) + height / Math.cos(this.deg)
      };
    },

    _getContainerLeft: function() {
      var height = this.element.height();
      return height * Math.tan((Math.PI / 180) * 20);
    },

    _getContainerBottom: function() {
      return this._getContainerSize().height - this.element.height();
    }
  });
  BI.shortcut("bi.watermark", WaterMark);
})();
