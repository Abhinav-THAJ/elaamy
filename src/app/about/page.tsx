import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          About Elaamy
        </h1>
        <div className="max-w-4xl mx-auto space-y-8 text-gray-700 leading-relaxed text-lg">
          <p>
            In hac habitasse platea dictumsta. Pellentesque viverra sem nec orci lacinia, in bibendum urna mollis. Quisque nunc lacus, varius vel leo a, pretium lobortis metus. Vivamus consectetur consequat justo.
          </p>
          <p>
            Ut vitae massa a metus viverra finibus gravida at purus. Fusce quis rutrum lectus. Suspendisse tincidunt, lorem at cursus sodales, ligula arcu molestie odio, non mattis est elit et enim. Nulla non erat sed metus bibendum aliquam. Nunc venenatis elementum magna, sit amet auctor nisi. Ut vitae nunc eleifend, congue lorem consectetur, sodales ligula. Mauris ac nulla at risus mollis luctus lacinia vitae tortor. Vestibulum ut mi ut tortor maximus tristique ac in mi.
          </p>
          <p>
            Phasellus sit amet iaculis tortor. Curabitur rhoncus arcu rutrum, tincidunt lorem sed, pulvinar magna. Donec pulvinar purus eget velit bibendum faucibus. Aliquam vitae turpis hendrerit, tempus diam ac, fringilla ex. Proin nec ex risus. Mauris suscipit at dui ut dapibus. Nam ullamcorper tincidunt est, et lacinia magna congue ut.
          </p>
        </div>
      </div>
    </div>
  );
}
