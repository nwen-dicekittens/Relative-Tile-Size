FilePicker.LAST_TILE_SIZE = 100;


Hooks.on("init", function (filepicker, arg1, arg2) {
    FilePicker.prototype._onDragStart = function (event) {
        const li = event.currentTarget;

        const img = li.querySelector("img");

        // Get the tile size ratio
        const tileRatio = (parseInt(li.closest("form").tileSize.value) || 100) / 100;
        const tileSize = Math.max(img.naturalWidth, img.naturalHeight) / tileRatio;
        FilePicker.LAST_TILE_SIZE = tileRatio * 100;
        const ratio = tileSize / canvas.dimensions.size;

        // Set drag data
        const dragData = {
            type: "Tile",
            img: li.dataset.path,
            tileSize: tileSize
        };
        event.dataTransfer.setData("text/plain", JSON.stringify(dragData));

        // Create the drag preview for the image
        const w = img.naturalWidth * canvas.stage.scale.x * tileRatio / ratio;
        const h = img.naturalHeight * canvas.stage.scale.y * tileRatio / ratio;
        const preview = DragDrop.createDragImage(img, w, h);
        event.dataTransfer.setDragImage(preview, w / 2, h / 2);
    }
});

Hooks.on("renderFilePicker", function (filepicker, arg1, arg2) {
    if (filepicker.displayMode === "tiles") {
        filepicker._element.find(".units")[0].innerText = "%";
    }
});