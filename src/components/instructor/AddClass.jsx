function AddClass() {
  return (
    <div className="my-10">
      <div className="w-11/12 md:w-3/4 lg:w-3/6 mx-auto bg-base-200 p-5">
        <form>
          <div className="flex justify-between">
            <div className="w-[49%]">
              <label>
                <span className="text-sm font-semibold">Class name:</span>
                <input
                  type="text"
                  className="w-full p-3 mb-3 border-none focus:outline-royalPurple"
                  placeholder="Class name"
                />
              </label>
            </div>
            <div className="w-[49%]">
              <label>
                <span className="text-sm font-semibold">Price:</span>
                <input
                  type="text"
                  className="w-full p-3 mb-3 border-none focus:outline-royalPurple"
                  placeholder="Price"
                />
              </label>
            </div>
          </div>

          <div>
            <label>
              <span className="text-sm font-semibold">Number of seats:</span>
              <input
                type="text"
                className="w-full p-3 mb-3 border-none focus:outline-royalPurple"
                placeholder="Number of seats"
              />
            </label>
          </div>
          <div>
            <label>
              <span className="text-sm font-semibold">Instructor name:</span>
              <input
                type="text"
                className="w-full p-3 mb-3 border-none focus:outline-royalPurple"
                placeholder="Instructor name"
                readOnly
              />
            </label>
          </div>
          <div>
            <label>
              <span className="text-sm font-semibold">Instructor email:</span>
              <input
                type="email"
                className="w-full p-3 mb-3 border-none focus:outline-royalPurple"
                placeholder="Instructor email"
                readOnly
              />
            </label>
          </div>
          <div>
            <label>
              <span className="text-sm font-semibold">Class Image:</span>
              <input
                type="file"
                className="file-input rounded-none w-full mb-3 border-none"
              />
            </label>
          </div>
          <div>
            <label>
              <span className="text-sm font-semibold">Description:</span>
              <textarea
                type="text"
                rows="5"
                className="w-full p-3 mb-3 border-none focus:outline-royalPurple"
                placeholder="Class description"
              />
            </label>
          </div>
          <button className="w-full p-3 border-none outline-none bg-royalPurple text-white">
            Add Class
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddClass;
