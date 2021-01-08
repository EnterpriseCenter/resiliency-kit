import Slider from 'react-slick'
import Image from 'next/image'

export const HomepageSlider = ({ people }) => {
    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue,
            randomIndex

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1
            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }

        return array
    }

    shuffle(people)

    var settings = {
        arrows: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    return (
        <div className="shadow-lg bg-white p-4 lg:p-8 rounded-lg">
            <Slider {...settings}>
                {people.map((person, index) => (
                    <figure key={index} className="text-center">
                        <Image
                            width="500"
                            height="500"
                            src={person.photo.url}
                            alt={
                                person.photo.alt ||
                                'A happy business owner who looks prepared for anything.'
                            }
                        />
                        <figcaption className="py-4 text-center text-gray-700">
                            <strong className="block text-lg text-gray-900">
                                {person.name}
                            </strong>
                            <div>
                                {person.title},{' '}
                                <a
                                    className="text-blue-400 hover:text-blue-300 hover:underline hover:pointer"
                                    href={`${person.link_to_business_website}`}
                                    rel="nofollow noreferrer"
                                    target="_blank"
                                >
                                    {person.business_name}
                                </a>
                            </div>
                            {person.location}
                        </figcaption>
                    </figure>
                ))}
            </Slider>
        </div>
    )
}

export default HomepageSlider
