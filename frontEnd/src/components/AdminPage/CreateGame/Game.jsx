import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Game() {
  const [form, setForm] = useState({
    name: "",
    img: "",
    category: "",
    length: "",
    rating: "",
  });
  // List of game category options
  const options = [];
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5050/game/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const game = await response.json();
      if (!game) {
        console.warn(`game with id: ${id} not found`);
        navigate("/");
        return;
      }
      setForm(game);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const agame = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new game we will POST to /game.
        response = await fetch("http://localhost:5050/game", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(agame),
        });
      } else {
        // if we are updating a game we will PATCH to /game/:id.
        response = await fetch(`http://localhost:5050/game/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(agame),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ name: "", img: "", category: "", length: "", rating: "" });
      navigate("/");
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Create/Update Game</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Game Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Name..."
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Image
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="image"
                    id="image"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Game cover..."
                    value={form.img}
                    onChange={(e) => updateForm({ img: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Category
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  {/* <input
                    type="text"
                    name="category"
                    id="category"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Category..."
                    value={form.category}
                    onChange={(e) => updateForm({ name: e.target.value })}
                  /> */}
                </div>
              </div>
            </div>
            <div>
              <fieldset className="mt-4">
                <legend className="sr-only">Category Options</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="categoryRPG"
                      name="categoryOptions"
                      type="radio"
                      value="RPG"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.category === "RPG"}
                      onChange={(e) => updateForm({ category: e.target.value })}
                    />
                    <label
                      htmlFor="categoryRPG"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      RPG
                    </label>
                    <input
                      id="categoryAdventure"
                      name="categoryOptions"
                      type="radio"
                      value="Adventure"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.category === "Adventure"}
                      onChange={(e) => updateForm({ category: e.target.value })}
                    />
                    <label
                      htmlFor="categoryAdventure"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Adventure
                    </label>
                    <input
                      id="categoryRacing"
                      name="categoryOptions"
                      type="radio"
                      value="Racing"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.category === "Racing"}
                      onChange={(e) => updateForm({ category: e.target.value })}
                    />
                    <label
                      htmlFor="categoryRacing"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Racing
                    </label>
                    <input
                      id="categorySports"
                      name="categoryOptions"
                      type="radio"
                      value="Sports"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.category === "Sports"}
                      onChange={(e) => updateForm({ category: e.target.value })}
                    />
                    <label
                      htmlFor="categorySports"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Sports
                    </label>
                    <input
                      id="categoryStrategy"
                      name="categoryOptions"
                      type="radio"
                      value="Strategy"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.category === "Strategy"}
                      onChange={(e) => updateForm({ category: e.target.value })}
                    />
                    <label
                      htmlFor="categoryStrategy"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Strategy
                    </label>
                    <input
                      id="categoryFirstPersonShooter"
                      name="categoryOptions"
                      type="radio"
                      value="FPS"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.category === "FPS"}
                      onChange={(e) => updateForm({ category: e.target.value })}
                    />
                    <label
                      htmlFor="categoryFirstPersonShooter"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      First-person Shooter
                    </label>
                    <input
                      id="categorySimulation"
                      name="categoryOptions"
                      type="radio"
                      value="Simulation"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.category === "Simulation"}
                      onChange={(e) => updateForm({ category: e.target.value })}
                    />
                    <label
                      htmlFor="categorySimulation"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Simulation
                    </label>
                    <input
                      id="categoryPuzzle"
                      name="categoryOptions"
                      type="radio"
                      value="Puzzle"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.category === "Puzzle"}
                      onChange={(e) => updateForm({ category: e.target.value })}
                    />
                    <label
                      htmlFor="categoryPuzzle"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Puzzle
                    </label>
                    <input
                      id="categoryShooter"
                      name="categoryOptions"
                      type="radio"
                      value="Shooter"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.category === "Shooter"}
                      onChange={(e) => updateForm({ category: e.target.value })}
                    />
                    <label
                      htmlFor="categoryShooter"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Shooter
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="length"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Duration
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="length"
                    id="length"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Game length..."
                    value={form.length}
                    onChange={(e) => updateForm({ length: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="rating"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Rating
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="rating"
                    id="rating"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Rating..."
                    value={form.rating}
                    onChange={(e) => updateForm({ rating: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Game"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}