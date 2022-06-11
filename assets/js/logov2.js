/* ==================================
	Animation on SCROLL | UP & DOWN  
	=================================== */
	$(".qodef-page-header").waypoint(
		function(direction) {
			// Target this element and run the up or down animation respectively

			if (direction === "down") {
				$(".fadeMe").addClass("blur-in-fwd");
				$("#smooth-logo").addClass("slideLeft");
				setTimeout(function() {
					$("#animOut")
						.get(0)
						.beginElement();
					$(".fadeMe").removeClass("blur-in-bkw");
					$("#smooth-logo").removeClass("slideRight");
				}, 50)
			} else if (direction === "up") {
				setTimeout(function() {
					$(".fadeMe").addClass("blur-in-bkw");
					$("#smooth-logo").addClass("slideRight");
					$("#animIn")
						.get(0)
						.beginElement();
					$(".fadeMe").removeClass("blur-in-fwd");
					$("#smooth-logo").removeClass("slideLeft");
				}, 50)
			}
		},
		{ offset: "0%" }
	);