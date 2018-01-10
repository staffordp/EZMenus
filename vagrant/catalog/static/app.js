$(function () {
    var bindEvents = function () {
        $("#appetizer-section").click(function () {
            $("#appetizer-row").slideToggle();
            if ($("#appetizer-toggle").hasClass("fa-chevron-up")) {
                $("#appetizer-toggle").toggleClass("fa-chevron-up");
                $("#appetizer-toggle").toggleClass("fa-chevron-down");
            } else {
                $("#appetizer-toggle").toggleClass("fa-chevron-down");
                $("#appetizer-toggle").toggleClass("fa-chevron-up");
            }
        });
        $("#entree-section").click(function () {
            $("#entree-row").slideToggle();
            if ($("#entree-toggle").hasClass("fa-chevron-up")) {
                $("#entree-toggle").toggleClass("fa-chevron-up");
                $("#entree-toggle").toggleClass("fa-chevron-down");
            } else {
                $("#entree-toggle").toggleClass("fa-chevron-down");
                $("#entree-toggle").toggleClass("fa-chevron-up");
            }
        });
        $("#dessert-section").click(function () {
            $("#dessert-row").slideToggle();
            if ($("#dessert-toggle").hasClass("fa-chevron-up")) {
                $("#dessert-toggle").toggleClass("fa-chevron-up");
                $("#dessert-toggle").toggleClass("fa-chevron-down");
            } else {
                $("#dessert-toggle").toggleClass("fa-chevron-down");
                $("#dessert-toggle").toggleClass("fa-chevron-up");
            }
        });
        $("#beverage-section").click(function () {
            $("#beverage-row").slideToggle();
            if ($("#beverage-toggle").hasClass("fa-chevron-up")) {
                $("#beverage-toggle").toggleClass("fa-chevron-up");
                $("#beverage-toggle").toggleClass("fa-chevron-down");
            } else {
                $("#beverage-toggle").toggleClass("fa-chevron-down");
                $("#beverage-toggle").toggleClass("fa-chevron-up");
            }
        });
        $("#icon-sort").click(function () {
            sortListDir();
        });
    };

    var bindForms = function () {

        var imageItems = [];
        var imageNode = $(".img_tn");
        var defaultImg = $('#target').val();

        console.log('defaultImg is ' + defaultImg);
        // Only set to 99 if this is a new restaurant
        var current = 99;
        var imagesArr = [];


        // Grab the filenames and push to array.
        imageNode.each(function (index) {
            // var parent = $(this).parent().get(0);
            // $(this).parent().parent().attr('id');
            // var src = $(this).attr('src');
            var imgPath = $(this).attr('data-imgpath');
            var fn = $(this).attr('data-fn');

            // console.log(index + ' : ' + src);
            // console.log(index + ' : ' + imgPath);
            console.log(index + ' : ' + fn);
            // This way, we don't push the default image that lacks a data-fn
            if (fn) {
                imagesArr.push(fn);
            }
            console.log('Push fn to imageAR');

            // Set the default image to defaultImg if the imgPath is that and if
            // this is the edit restaurant form.
            if (imgPath == defaultImg && ($("#editRestForm").length)) {
                console.log('match');
                console.log('edit restaurant form')
                console.log(imgPath);
                console.log(parent);
                $(parent).toggleClass('selected');
            }

        });

        // Set the default selected image to N/A
        // if (($("#editRestForm").length) || ($("#newRestForm").length)) {
        //     console.log('this is the edit/new restaurant');
        //     var el = $('#target').attr('data-index');
        //     $("ul.img_gallery li.img_thumbnail:eq(" + el + ")").toggleClass("selected");
        //
        // }



        $(".img_thumbnail").click(function (e) {
            imgClick();
        });

        // Upload image file
        $(".btn-file").click(function (e) {
            console.log('Upload clicked');
            var file = document.getElementById('upload').files[0]; //Files[0] = 1st file
            var filename = document.getElementById('upload').files[0].name;
            var formData = new FormData();
            formData.append('image', file, filename);

            $.ajax({
                url: '/uploadImage',
                data: formData,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function (response) {
                    console.log(response);
                    // Reset the upload divs
                    $('#upload').val("");
                    // $(".no_upload").css("margin-top", "0");
                    $('.upload_container').css("visibility", "hidden");

                    if ($(".upload_container").addClass('animated bounceInUp')) {
                        $('.upload_container').removeClass('animated bounceInUp');
                    }
                    ;
                    var returnedData = JSON.parse(response);

                    if ('status' in returnedData && returnedData.status == "OK") {
                        console.log('status is ok');
                        // Grab the index of the new element
                        var idx = returnedData.index;
                        var HTMLimage = '<li class="img_thumbnail" id="img_thumbnail_%data%" data-index="%data%"><img id="img_%data%" class="img_tn img_tn_ul" data-index="%data%" src="" alt="img"></li>';
                        var formattedHTML = HTMLimage.replace(/%data%/g, idx);
                        // Add the image thumbnail node
                        console.log('Going to add image thumbnail node (without src)');
                        console.log('Adding: ' + formattedHTML);
                        $('.img_gallery').append(formattedHTML);
                        // console.log('Setting the image to be for the last img_tn_ul element');
                        var node = $('.img_tn_ul').last();
                        var reader = new FileReader();

                        reader.readAsDataURL(file);

                        // Set the node as selected
                        $('#img_thumbnail_' + idx).toggleClass('selected');

                        // Add click listener
                        $('#img_thumbnail_' + idx).click(function (e) {
                            imgClick();
                        });


                        $('#i_delete_' + idx).toggleClass('icon_show');

                        // Add the icon node
                        var HTMLicon = '<div class="icons_delete" id="icons_delete_%data%" data-index="%data%"><i id="i_delete_%data%" data-index="%data%" data-tn="img_thumbnail_%data%" data-parent="icons_delete_%data%" class="fa fa-times-circle i_delete icon_show" aria-hidden="true"></i></div>'
                        var formattedIcon = HTMLicon.replace(/%data%/g, idx);
                        console.log(formattedIcon);
                        $('.image_container').append(formattedIcon);

                        // Add click listener
                        $('#i_delete_' + idx).click(function (e) {
                            iconClick();
                        });

                        reader.onloadend = function () {
                            node.attr("src", reader.result);
                            console.log('Image node has been added');
                            console.log(idx);
                            console.log(node);
                            console.log('Pushing to imagesArr');
                            imagesArr.push(filename);
                            console.log('old current is ' + current.toString());
                            oldImage = $('#img_thumbnail_' + current);
                            oldIcon = $('#i_delete_' + current);
                            console.log('old image is: ');
                            console.log(oldImage);
                            // toggleElements(oldImage, oldIcon);
                            if (oldImage.hasClass('selected')) {
                                console.log('toggling selected from previous selected image')
                                oldImage.toggleClass('selected');
                            }

                            if (oldIcon.hasClass('icon_show')) {
                                console.log('toggling icon_show from previous selected icon')
                                oldIcon.toggleClass('icon_show');
                            }
                            // Set current to just added image
                            current = idx;
                            console.log('new current is ' + current.toString());

                            // Finally, check to see if we are at the max 5 images
                            countImages();

                        };
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });

        // Delete image file
        $(".i_delete").click(function (e) {
            if ($(e.target).hasClass('icon_show')) {
                iconClick();
            }
        });

        $(".btn-set").on("click", function () {
            console.log('Image has been set.');
            // Change the image on the form circle to be the selected image.
        });

        // Upload file change
        $("#upload").change(function (e) {
            console.log('File has changed.');
            console.log(e.target.value);
            console.log((e.target.value).slice(12));
            var f = this.files[0];
            var sizeInMb = f.size / 1024;
            var sizeLimit = 1024 * 1; // if you want 1 MB
            if (sizeInMb > sizeLimit) {
                alert('Sorry the file exceeds the maximum size of 1 MB!');
                // reset the input (code for all browser)
                var es = document.forms[0].elements;
                try {
                    $('#upload').val("");
                } catch (err) {
                    console.log('Error with clearing upload. ' + err);
                }
            }
            else {
                console.log('Going to run checkforduplicate.');
                // Set the upload_container to visible.
                // $(".no_upload").css("margin-top", "0");
                if (checkDuplicate(f.name)) {
                    console.log('Diplicate file found.');
                    $('#upload').val("");
                    alert("File is already uploaded!");
                } else {
                    console.log('No filename duplicates found.');
                    $(".upload_container").css("visibility", "visible");
                    $(".upload_container").addClass('animated bounceInUp');
                }

            }
        });


        var checkDuplicate = function (filename) {
            // var imageNode = $(".img_tn");
            console.log('Looking for a match of ' + filename);
            console.log('imagesArr');
            for (var i = 0; i < imagesArr.length; i++) {
                console.log(i + ' : ' + imagesArr[i]);
            }

            if (imagesArr.indexOf(filename) == -1) {
                console.log('filename not found. returning false.')
                return false;
            }

            console.log('filename found to already exist. Returning true');
            return true;
        };

        var countImages = function () {
            console.log('inside countImages function.');
            //Check for image thumbnails on the image_gallery.
            if (imagesArr.length) {
                console.log('image length is ' + imagesArr.length);
                console.log('Images in imagesArr:');
                for (var i = 0; i < imagesArr.length; i++) {
                    console.log(i + ' : ' + imagesArr[i]);
                }
                if (imagesArr.length >= 5) {
                    console.log('No more images permitted until you delete one.');
                    // $(".btn-file").css("display", "none");
                    $(".no_upload").css("visibility", "visible");
                    $(".file_container").css('visibility', 'hidden');
                    $(".no_upload").css("margin-top", "-50px");
                }
            }
        };

        var iconClick = function () {
            console.log('delete click');

            //Grab the data-parent attribute which stores the ID of the parent
            var iconID = '#' + ($(event.target).attr("data-parent"));
            // Grab the index of the imagge
            var imgIndex = ($(event.target).attr("data-index"));
            // Grab the data-tn attribute which stores the ID of the img_thumbnail
            var imgID = '#' + ($(event.target).attr("data-tn"));
            var fn = ($(event.target).attr("data-fn"));
            // Grab the node objects
            var imgNode = $(imgID);
            var iNode = $(iconID);


            console.log(iNode);
            console.log(imgNode);

            var data = {"image_index": imgIndex};
            console.log('Sending delete for index ' + imgIndex.toString());
            console.log('Filename is:' + fn);

            $.ajax({
                url: '/deleteImage',
                contentType: 'application/json',
                data: JSON.stringify(data),
                dataType: 'json',
                type: 'POST',
                success: function (response) {
                    console.log(response);
                    console.log("Success. Going to remove images from DOM.");
                    // Remove the image from the page
                    $(iNode).remove();
                    $(imgNode).remove();
                    console.log("Removing image from imagesArr");
                    var idx = imagesArr.indexOf(fn);
                    if (idx > -1) {
                        imagesArr.splice(idx, 1);
                    }
                    // $(iNode).css('display', 'none');
                    // $(imgNode).css('display', 'none');
                    console.log('Images can be added');
                    $(".file_container").css("visibility", "visible");
                    $(".no_upload").css("visibility", "hidden");
                },
                error: function (error) {
                    console.log(error);
                    console.log("Error. Cannot Remove image from DOM.");
                }
            });
        };

        var imgClick = function () {
            console.log('current is ' + current.toString());
            var oldImage, oldIcon, newImage, newIcon;
            if ($(event.target).hasClass('img_thumbnail')) {
                // User clicks the thumbnail frame
                console.log('Clicked img_thumbnail.');
                if ($(event.target).hasClass('selected')) {
                    console.log('It has class selected. Doing nothing.');
                    // do nothing
                } else {
                    // Let's toggle the old selection
                    oldImage = $('#img_thumbnail_' + current);
                    oldIcon = $('#i_delete_' + current);
                    if (oldImage.hasClass('selected')) {
                        console.log('toggling selected from previous selected image')
                        oldImage.toggleClass('selected');
                    }

                    if (oldIcon.hasClass('icon_show')) {
                        console.log('toggling icon_show from previous selected icon');
                        oldIcon.toggleClass('icon_show');
                    }

                    // Does not have selected, Going to toggle it.
                    $(event.target).toggleClass('selected');
                    console.log('It does not have class selected.');
                    console.log('event target is ' + event.target)

                    current = $(event.target).attr('data-index');
                    console.log('current is now ' + current);
                    // Assign el to the target's associated icon
                    var el = $('#i_delete_' + current);
                    // Check if the element has a class, therefore existing
                    if (!el.hasClass('i_delete')) {
                        console.log('there is no element. Do not know why Going to grab last .icon_delete');
                        var index = ($(".image_container .icons_delete").length);
                        console.log('index is ' + index.toString());
                        el = $('#i_delete_' + index);
                        console.log('further item down is');
                        console.log(el);
                        if (el.hasClass('icon_show')) {
                            el.toggleClass('icon_show');
                        }
                    } else {
                        console.log('Toggling icon_show on target icon')
                        el.toggleClass('icon_show');
                    }
                    $('#target').children().val('');
                }
            }
            // User clicks the image. Happens most of the time
            else {
                console.log('Clicked image..');
                console.log('parent is...');
                console.log($(event.target).parent());
                if ($(event.target).parent().hasClass('selected')) {
                    // do nothing
                    console.log('parent has class selected. Doing nothing.');
                } else {
                    // Let's toggle the old selection
                    console.log('old selection is ' + current.toString());
                    oldImage = $('#img_thumbnail_' + current);
                    oldIcon = $('#i_delete_' + current);
                    console.log('old image is: ');
                    console.log(oldImage);
                    // toggleElements(oldImage, oldIcon);
                    if (oldImage.hasClass('selected')) {
                        console.log('toggling selected from previous selected image')
                        oldImage.toggleClass('selected');
                    }

                    if (oldIcon.hasClass('icon_show')) {
                        console.log('toggling icon_show from previous selected icon')
                        oldIcon.toggleClass('icon_show');
                    }

                    console.log('parent does not have class selected.');
                    console.log('going to toggle parent class of selected');
                    // Assign the seleted variable to the data-index of the target
                    current = $(event.target).attr('data-index');
                    console.log('current is now ' + current);

                    newImage = $('#img_thumbnail_' + current);
                    newIcon = $('#i_delete_' + current);

                    if (newImage.not('selected')) {
                        console.log('toggling selected of target image');
                        newImage.toggleClass('selected');
                    }
                    if (newIcon.not('icon_show')) {
                        console.log('toggling icon_show of target icon');
                        newIcon.toggleClass('icon_show');
                    }
                    // Grab the filename and assign it to the target value.
                    console.log("Setting value of target")
                    if ($(newImage).children().attr('data-fn')) {
                        var path = newImage.children().attr('data-fn');
                        console.log('setting value to ' + path);
                        $('#target').val(path);
                    } else {
                        // Does not have attribute, therefore must be default.
                        $('#target').val(defaultImg);
                    }

                }
            }

        };

        // Main execution
        // Start off by counting the images
        countImages();


    };

    bindEvents();
    // Check to see if this is the newRestForm or editForm.
    if (($("#editRestForm").length) || ($("#newRestForm").length)) {
        // If ao, bind form events.
        bindForms();
    }


});
